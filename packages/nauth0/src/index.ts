import BrowserNAuth0Client from './browser';
import { NAuth0Client } from './client';
import ServerNAuth0Client, { NAuth0Options } from './server';
import { RouteHandler } from './server/RouteHandler';
import { CookieSessionStore } from './server/session/CookieSessionStore';

export default (opts: NAuth0Options): NAuth0Client => {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    return new BrowserNAuth0Client();
  }

  const sessionStore = new CookieSessionStore(opts);
  const routeHandler = new RouteHandler(opts, sessionStore);
  return new ServerNAuth0Client(opts, routeHandler, sessionStore);
};

export * from './browser';
export * from './server';
export * from './lib';
