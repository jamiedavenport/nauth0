import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { NAuth0Options } from './config';
import { sessionCookie, stateCookie } from './cookies';
import { createState } from './oidc';
import OidcClientProvider from './OidcClientProvider';
import { sessionFromTokenSet } from './session';
import { SessionStore } from './session/store';

export class RouteHandler {
  constructor(
    private readonly opts: NAuth0Options,
    private readonly sessionStore: SessionStore,
    private readonly clientProvider: OidcClientProvider
  ) {}

  private tempRedirect(res: NextApiResponse, location: string) {
    res
      .writeHead(302, {
        Location: location,
      })
      .end();
  }

  private async login(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const state = createState();

    const client = await this.clientProvider.getClient();
    const authorizationUrl = client.authorizationUrl({
      redirect_uri: this.opts.redirectUri,
      scope: this.opts.scope,
      response_type: 'code',
      audience: this.opts.audience,
      state,
    });

    setCookie({ res }, stateCookie, state, {
      maxAge: 60 * 60,
      httpOnly: true,
    });

    this.tempRedirect(res, authorizationUrl);
  }

  private notFound(req: NextApiRequest, res: NextApiResponse): void {
    res.status(404).end();
  }

  private async callback(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const cookies = parseCookies({ req });
    const state = cookies[stateCookie];

    if (typeof state === undefined) {
      throw new Error('Missing state cookie');
    }

    const client = await this.clientProvider.getClient();
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(this.opts.redirectUri, params, {
      state,
    });

    const session = sessionFromTokenSet(tokenSet);
    await this.sessionStore.save({ req }, { res }, session);

    this.tempRedirect(res, '/'); // TODO: Get the redirectUri
  }

  private async logout(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    // TODO: This is very auth0 specific. If we want to make this work with any OIDC provider then it needs to change to use the end_session_url from .well-known
    const { domain, clientId, logoutRedirectUri } = this.opts;
    const endSessionUrl = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(
      logoutRedirectUri
    )}`;

    destroyCookie({ res }, stateCookie);
    destroyCookie({ res }, sessionCookie, {
      path: '/',
    });

    this.tempRedirect(res, endSessionUrl);
  }

  private async session(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const session = await this.sessionStore.get({ req }, { res });

    if (!session) {
      res.status(401).end();
      return;
    }

    res.json(session);
  }

  private getActionFromRequest(req: NextApiRequest): string {
    return req.query.auth as string;
  }

  handler(): NextApiHandler {
    const apiHandler: NextApiHandler = async (req, res) => {
      const action = this.getActionFromRequest(req);
      switch (action) {
        case 'login':
          this.login(req, res);
          break;
        case 'callback':
          this.callback(req, res);
          break;
        case 'logout':
          this.logout(req, res);
          break;
        case 'session':
          this.session(req, res);
          break;

        default:
          this.notFound(req, res);
      }
    };

    return apiHandler;
  }
}
