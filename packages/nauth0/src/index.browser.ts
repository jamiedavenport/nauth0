import BrowserNAuth0Client from './browser';
import { NAuth0Client } from './client';

export default (): NAuth0Client => {
  return new BrowserNAuth0Client();
};

export * from './browser';
export * from './lib';
