import BrowserNAuth0Client from './browser';
import { NAuth0Client } from './client';
import ServerNAuth0Client, { NAuth0Options } from './server';

export default (opts: NAuth0Options): NAuth0Client => {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    return new BrowserNAuth0Client();
  }

  return new ServerNAuth0Client(opts);
};

export * from './browser';
export * from './server';
