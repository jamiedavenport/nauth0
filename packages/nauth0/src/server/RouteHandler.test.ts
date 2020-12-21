import { NAuth0Options } from './config';
import OidcClientProvider from './OidcClientProvider';
import RouteHandler from './RouteHandler';
import MemorySessionStore from './session/MemorySessionStore';
import RefreshingSessionStore from './session/RefreshingSessionStore';
import { createMocks } from 'node-mocks-http';
import { Session } from '../lib';

jest.useFakeTimers('modern').setSystemTime(1);

const opts: NAuth0Options = {
  domain: 'example.com',
  clientId: 'clientId',
  clientSecret: 'clientSecret',
  scope: 'openid profile offline_access',
  redirectUri: 'http://localhost:3000/api/auth/callback',
  logoutRedirectUri: 'http://localhost:3000/',
  session: {
    cookieSecret: 'thisisthesupersecretcookiesecretthing',
  },
};

describe('RouteHandler', () => {
  describe('session', () => {
    const createSessionCtx = () =>
      createMocks({
        method: 'GET',
        url: '/api/auth/session',
        query: {
          auth: 'session',
        },
      });

    const validSession: Session = {
      user: {
        id: '1',
      },
      expiresAt: 1,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    const refreshFunction = jest.fn().mockResolvedValue(validSession);
    const backingSessionStore = new MemorySessionStore();
    const sessionStore = new RefreshingSessionStore(
      backingSessionStore,
      refreshFunction
    );
    const oidcClientProvider = new OidcClientProvider(opts);
    const routeHandler = new RouteHandler(
      opts,
      sessionStore,
      oidcClientProvider
    );
    const handler = routeHandler.handler();

    beforeEach(() => {
      backingSessionStore.reset();
      refreshFunction.mockClear();
    });

    it.skip('should return the valid session', async () => {
      const ctx = createSessionCtx();
      const { req, res } = ctx;

      backingSessionStore.save(ctx, validSession);

      await handler(req, res);

      expect(res.statusCode).toBe(200);
    });

    it('should return the unauthorized when no session exists', async () => {
      const ctx = createSessionCtx();
      const { req, res } = ctx;

      await handler(req, res);
      expect(res.statusCode).toBe(401);
    });

    it('should refresh the session when expired and a `refreshToken` exists', async () => {
      const ctx = createSessionCtx();
      const { req, res } = ctx;

      const expiredSession = { ...validSession, expiresAt: 0 };
      backingSessionStore.save(ctx, expiredSession);

      await handler(req, res);

      expect(refreshFunction).toBeCalledTimes(1);
      expect(res.statusCode).toBe(200);
    });

    it('should return unauthorized when the session is expired and no `refreshToken` exists', async () => {
      const ctx = createSessionCtx();
      const { req, res } = ctx;

      const expiredSessionWithoutRefreshToken = {
        ...validSession,
        expiresAt: 0,
        refreshToken: undefined,
      };
      backingSessionStore.save(ctx, expiredSessionWithoutRefreshToken);

      await handler(req, res);

      expect(res.statusCode).toBe(401);
    });
  });
});
