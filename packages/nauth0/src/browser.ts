import { NextApiHandler } from 'next';
import { NAuth0Client } from './client';
import { Session } from './lib';

class BrowserNAuth0Client implements NAuth0Client {
  handler(): NextApiHandler {
    throw new Error('Handler only implemented for the server');
  }

  getSession(): Session {
    throw new Error('Method not implemented.');
  }
}

export default BrowserNAuth0Client;
