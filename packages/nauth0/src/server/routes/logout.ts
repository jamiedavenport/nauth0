import { destroyCookie } from 'nookies';
import { sessionCookie, stateCookie } from '../cookies';
import { NAuth0ApiRoute } from './route';

export const logoutRoute: NAuth0ApiRoute = async (req, res, opts) => {
  // TODO: This is very auth0 specific. If we want to make this work with any OIDC provider then it needs to change to use the end_session_url from .well-known
  const endSessionUrl = `https://${opts.domain}/v2/logout?client_id=${
    opts.clientId
  }&returnTo=${encodeURIComponent(opts.logoutRedirectUri)}`;

  destroyCookie({ res }, stateCookie);
  destroyCookie({ res }, sessionCookie, {
    path: '/',
  });

  res
    .writeHead(302, {
      Location: endSessionUrl,
    })
    .end();
};
