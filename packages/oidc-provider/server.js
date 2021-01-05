const { Provider } = require('oidc-provider');
const configuration = {
  clients: [
    {
      client_id: 'client-id',
      client_secret: 'client-secret',
      redirect_uris: ['http://localhost:3000/api/auth/callback'],
    },
  ],
  formats: {
    AccessToken: 'jwt',
    RefreshToken: 'jwt',
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
