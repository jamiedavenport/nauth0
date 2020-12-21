import { NextApiHandler } from 'next';
import { Context, NAuth0Client } from '../client';
import { NAuth0Options } from './config';
import { Session } from '../lib';
import RouteHandler from './RouteHandler';
import SessionStore from './session/SessionStore';

class ServerNAuth0Client implements NAuth0Client {
  constructor(
    private readonly opts: NAuth0Options,
    private readonly routeHandler: RouteHandler,
    private readonly sessionStore: SessionStore
  ) {}

  handler(): NextApiHandler {
    return this.routeHandler.handler();
  }

  getSession(ctx: Context): Promise<Session | null> {
    return this.sessionStore.get(ctx);
  }
}

export default ServerNAuth0Client;
export * from './config';
