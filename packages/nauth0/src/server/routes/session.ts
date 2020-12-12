import { verify } from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { sessionCookie } from '../cookies';
import { NAuth0ApiRoute } from './route';

export const sessionRoute: NAuth0ApiRoute = (req, res, opts) => {
  const cookies = parseCookies({ req });
  const rawSession = cookies[sessionCookie];

  if (typeof rawSession === 'undefined') {
    res.status(401).end();
    return;
  }

  const session = verify(rawSession, opts.session.cookieSecret);

  res.json(session);
};
