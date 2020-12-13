import { verify } from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { sessionCookie } from '../cookies';
import { isValidToken } from '../session';
import { NAuth0ApiRoute } from './route';

export const sessionRoute: NAuth0ApiRoute = (req, res, opts) => {
  const cookies = parseCookies({ req });
  const rawToken = cookies[sessionCookie];

  if (typeof rawToken === 'undefined') {
    res.status(401).end();
    return;
  }

  const token = verify(rawToken, opts.session.cookieSecret);

  if (!isValidToken(token)) {
    throw new Error('Decoded token was not of type `object`');
  }

  res.json(token.session);
};
