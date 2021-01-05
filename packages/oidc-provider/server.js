const { Provider } = require('oidc-provider');
const configuration = {
  conformIdTokenClaims: false,
  features: {
    introspection: { enabled: true },
    revocation: { enabled: true },
  },
  clients: [
    {
      client_id: 'client-id',
      client_secret: 'client-secret',
      redirect_uris: ['http://localhost:3000/api/auth/callback'],
      response_types: ['code'],
      grant_types: ['authorization_code'],
    },
  ],
  formats: {
    AccessToken: 'jwt',
    RefreshToken: 'jwt',
  },
  claims: {
    openid: ['sub'],
    email: ['email', 'email_verified'],
    profile: ['name', 'given_name', 'family_name', 'picture'],
  },
  findAccount(ctx, id) {
    return {
      accountId: id,
      async claims() {
        return {
          sub: id,
          name: 'John Doe',
          given_name: 'John',
          family_name: 'Doe',
          email: 'johndoe@internet.website',
          email_verified: true,
          picture: 'photo.jpg',
        };
      },
    };
  },
};

const port = 9090;
const oidc = new Provider(`http://localhost:${port}`, configuration);

let server;
(async () => {
  server = oidc.listen(port, () => {
    console.info(`http://localhost:${port}/.well-known/openid-configuration`);
  });
})().catch((err) => {
  if (server && server.listening) server.close();
  console.error(err);
  process.exitCode = 1;
});
