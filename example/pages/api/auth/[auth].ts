import { apiHandler } from 'nauth0/dist/server';

export default apiHandler({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/api/auth/callback',
  scope: 'openid profile',
  session: {
    cookieSecret: 'superdupersecret',
  },
});
