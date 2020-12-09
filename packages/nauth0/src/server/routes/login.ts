import { NAuth0ApiRoute } from './route';
import { Issuer } from 'openid-client';
import { createState } from '../oidc';
import { setCookie } from 'nookies';

export const loginRoute: NAuth0ApiRoute = async (req, res, opts) => {
  const issuer = await Issuer.discover(`https://${opts.domain}/`);
  const client = new issuer.Client({
    client_id: opts.clientId,
    client_secret: opts.clientSecret,
    redirect_uris: [opts.redirectUri],
    response_types: ['code'],
  });

  const state = createState();

  const authorizationUrl = client.authorizationUrl({
    redirect_uri: opts.redirectUri,
    scope: opts.scope,
    response_type: 'code',
    audience: opts.audience,
    state,
  });

  setCookie({ res }, 'nauth0:state', state, {
    maxAge: 60 * 60,
    httpOnly: true,
  });

  res
    .writeHead(302, {
      Location: authorizationUrl,
    })
    .end();
};
