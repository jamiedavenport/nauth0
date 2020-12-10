import { TokenSet } from 'openid-client';
import { Session } from 'src/lib';
import { sign } from 'jsonwebtoken';
import { NAuth0Config } from './config';

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
  return sign(session, opts.session.cookieSecret);
};
