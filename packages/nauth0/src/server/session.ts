import { TokenSet } from 'openid-client';
import { Session } from 'src/lib';
import { sign } from 'jsonwebtoken';
import { NAuth0Config } from './config';

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

export const encodeSession = (session: Session, opts: NAuth0Config): string => {
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
