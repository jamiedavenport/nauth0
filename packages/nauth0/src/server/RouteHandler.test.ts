import { NAuth0Options } from './config';
import OidcClientProvider from './OidcClientProvider';
import RouteHandler from './RouteHandler';
import MemorySessionStore from './session/MemorySessionStore';
import RefreshingSessionStore from './session/RefreshingSessionStore';

const opts: NAuth0Options = {
  domain: 'example.com',
  clientId: 'clientId',
  clientSecret: 'clientSecret',
  scope: '',
  redirectUri: 'http://localhost:3000/api/auth/callback',
  logoutRedirectUri: 'http://localhost:3000/',
  session: {
    cookieSecret: 'thisisthesupersecretcookiesecretthing',
  },
};

describe('RouteHandler', () => {
  describe('session', () => {
    it('should return the valid session', () => {
      const refreshFunction = jest.fn();
      const backingSessionStore = new MemorySessionStore();
      const sessionStore = new RefreshingSessionStore(
        backingSessionStore,
        refreshFunction
      );
      const oidcClientProvider = new OidcClientProvider(opts);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const routeHandler = new RouteHandler(
        opts,
        sessionStore,
        oidcClientProvider
      );
    });
    it.todo('should return the unauthorized when no session exists');
    it.todo(
      'should refresh the session when expired and a `refreshToken` exists'
    );
    it.todo(
      'should return unauthorized when the session is expired and no `refreshToken` exists'
    );
  });
});
