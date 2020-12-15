import { Session } from 'lib';
import { NAuth0Client } from 'client';
import { NextApiHandler } from 'next';

class BrowserNAuth0Client implements NAuth0Client {
  handler(): NextApiHandler {
    throw new Error('Handler only implemented for the server');
  }

  getSession(): Session {
    throw new Error('Method not implemented.');
  }
}

export default BrowserNAuth0Client;
export * from './SessionProvider';
export * from './useSession';
