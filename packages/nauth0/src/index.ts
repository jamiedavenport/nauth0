import BrowserNAuth0Client from './browser';
import { NAuth0Client } from './client';
import { Session } from './lib';
import ServerNAuth0Client, { NAuth0Options } from './server';
import OidcClientProvider from './server/OidcClientProvider';
import { RouteHandler } from './server/RouteHandler';
import { sessionFromTokenSet } from './server/session';
import { CookieSessionStore } from './server/session/CookieSessionStore';
import RefreshingSessionStore from './server/session/RefreshingSessionStore';

export default (opts: NAuth0Options): NAuth0Client => {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    return new BrowserNAuth0Client();
  }

  const oidcClientProvider = new OidcClientProvider(opts);
  const refreshFunction = async ({
    refreshToken,
  }: Session): Promise<Session> => {
    if (typeof refreshToken === 'undefined') {
      throw new Error('Missing refresh token'); // TODO: Improve this
    }
    const client = await oidcClientProvider.getClient();
    const tokenSet = await client.refresh(refreshToken);
    return sessionFromTokenSet(tokenSet);
  };
  const sessionStore = new RefreshingSessionStore(
    new CookieSessionStore(opts),
    refreshFunction
  );
  const routeHandler = new RouteHandler(opts, sessionStore, oidcClientProvider);
  return new ServerNAuth0Client(opts, routeHandler, sessionStore);
};

export * from './browser';
export * from './server';
export * from './lib';
