import { TokenSet } from 'openid-client';
import { sign } from 'jsonwebtoken';
import { NAuth0Options } from './config';
import { Session } from './lib';

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

export const encodeSession = (
  session: Session,
  opts: NAuth0Options
): string => {
  return sign({ session }, opts.session.cookieSecret);
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
