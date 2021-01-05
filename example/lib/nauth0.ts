import nauth0 from 'nauth0';

export default nauth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/api/auth/callback',
  logoutRedirectUri: 'http://localhost:3000/',
  scope: 'openid profile offline_access email',
  session: {
    cookieSecret:
      'superdupersecretsuperdupersecretsuperdupersecretsuperdupersecret',
  },
});
