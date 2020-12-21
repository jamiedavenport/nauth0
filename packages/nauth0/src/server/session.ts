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
      name: claims.name,
      givenName: claims.given_name,
      familyName: claims.family_name,
      email: claims.email,
      emailVerified: claims.email_verified,
      picture: claims.picture,
    },
    expiresAt: tokenSet.expires_at,
    accessToken: tokenSet.access_token,
    refreshToken: tokenSet.refresh_token,
  };
};
