import { TokenSet } from 'openid-client';
import { NAuth0Options } from './config';
import { Session } from '../lib';
import SignJWT from 'jose/jwt/sign';
import { NextApiRequest, NextPageContext } from 'next';
import jwtVerify from 'jose/jwt/verify';
import { parseCookies } from 'nookies';
import { sessionCookie } from './cookies';

export interface Token {
  session: Session;
}

export const sessionFromTokenSet = (tokenSet: TokenSet): Session => {
  const claims = tokenSet.claims();
  return {
    user: {
      id: claims.sub,
    },
    accessToken: tokenSet.access_token,
  };
};

export const encodeSession = async (
  session: Session,
  opts: NAuth0Options
): Promise<string> => {
  const secret = new TextEncoder().encode(opts.session.cookieSecret);

  return await new SignJWT({ session })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(secret);
};

export const getSessionFromReq = async (
  req:
    | Pick<NextPageContext, 'req'>
    | {
        req: NextApiRequest;
      },
  opts: NAuth0Options
): Promise<Session> => {
  const cookies = parseCookies(req);
  const rawToken = cookies[sessionCookie];

  if (typeof rawToken === 'undefined') {
    throw new Error('Unauthorized'); // TODO: Throw a specific UnauthorizedError and then return 401 from the handler
  }

  const secret = new TextEncoder().encode(opts.session.cookieSecret);
  const { payload } = await jwtVerify(rawToken, secret);

  return payload.session;
};
