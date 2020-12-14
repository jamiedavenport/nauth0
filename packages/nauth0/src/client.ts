import { NextApiHandler } from 'next';
import { Session } from './lib';

export interface NAuth0Client {
  handler(): NextApiHandler;
  getSession(): Session;
}
