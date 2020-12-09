import { NAuth0ApiRoute } from './route';
import { Issuer } from 'openid-client';
import { createState } from '../oidc';

export const loginRoute: NAuth0ApiRoute = async (req, res, opts) => {
  // TODO: Implement the login route
  // https://auth0.com/docs/flows/authorization-code-flow
  // 1. Create OIDC client
  // 2. Generate the authorization state and URL
  // 3. Set state in cookie to compare when redirecting
  // 4. Redirect to the authorization URL

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

  // TODO: Save the state in a cookie

  res
    .writeHead(302, {
      Location: authorizationUrl,
    })
    .end();
};
