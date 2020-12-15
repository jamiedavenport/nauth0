import { parseCookies } from 'nookies';
import { sessionCookie } from '../cookies';
import { NAuth0ApiRoute } from './route';
import jwtVerify from 'jose/jwt/verify';

export const sessionRoute: NAuth0ApiRoute = async (req, res, opts) => {
  const cookies = parseCookies({ req });
  const rawToken = cookies[sessionCookie];

  if (typeof rawToken === 'undefined') {
    res.status(401).end();
    return;
  }

  const secret = new TextEncoder().encode(opts.session.cookieSecret);
  const { payload } = await jwtVerify(rawToken, secret);

  res.json(payload.session);
};
