import { TokenSet } from 'openid-client';
import { Session } from '../lib';

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
    refreshToken: tokenSet.refresh_token,
  };
};
