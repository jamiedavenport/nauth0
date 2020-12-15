import { TokenSet } from 'openid-client';
import { NAuth0Options } from './config';
import { Session } from '../lib';
import SignJWT from 'jose/jwt/sign';

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
