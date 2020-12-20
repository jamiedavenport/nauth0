import { NAuth0ApiRoute } from './route';
import { createClient, createState } from '../oidc';
import { setCookie } from 'nookies';
import { stateCookie } from '../cookies';
import { RedirectKey } from '../config';

export const loginRoute: NAuth0ApiRoute = async (req, res, opts) => {
  const client = await createClient(opts);
  const state = createState(
    req.query[RedirectKey]
      ? {
          [RedirectKey]: req.query[RedirectKey],
        }
      : {}
  );

  const authorizationUrl = client.authorizationUrl({
    redirect_uri: opts.redirectUri,
    scope: opts.scope,
    response_type: 'code',
    audience: opts.audience,
    state,
  });

  setCookie({ res }, stateCookie, state, {
    maxAge: 60 * 60,
    httpOnly: true,
  });

  res
    .writeHead(302, {
      Location: authorizationUrl,
    })
    .end();
};
