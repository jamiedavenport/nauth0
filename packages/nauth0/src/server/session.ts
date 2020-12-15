import { TokenSet } from 'openid-client';
import { NAuth0Options } from './config';
import { Session } from 'lib';
import SignJWT from 'jose/jwt/sign';
import jwtVerify from 'jose/jwt/verify';
import { parseCookies } from 'nookies';
import { sessionCookie } from './cookies';
import { GetSessionOpts } from 'client';

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

const encodeSecret = (secret: string): Uint8Array => {
  return new TextEncoder().encode(secret);
};

export const encodeSession = async (
  session: Session,
  opts: NAuth0Options
): Promise<string> => {
  const secret = encodeSecret(opts.session.cookieSecret);

  return await new SignJWT({ session })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(secret);
};

export const getSessionFromReq = async (
  req: GetSessionOpts,
  opts: NAuth0Options
): Promise<Session | null> => {
  const cookies = parseCookies(req);
  const rawToken = cookies[sessionCookie];

  if (typeof rawToken === 'undefined') {
    return null;
  }

  const secret = encodeSecret(opts.session.cookieSecret);
  const { payload } = await jwtVerify(rawToken, secret);

  return payload.session;
};
