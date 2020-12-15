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

  return await new SignJWT({ session }).sign(secret);
};

export const isValidToken = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  decodedToken: string | object
): decodedToken is Token => {
  if (typeof decodedToken !== 'object') {
    return false;
  }

  if ((decodedToken as Token).session === undefined) {
    return false;
  }

  return true;
};
