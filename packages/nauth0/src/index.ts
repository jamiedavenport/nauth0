/* eslint-disable @typescript-eslint/no-explicit-any */
import BrowserNAuth0Client from './browser';
import { NAuth0Client } from './client';
import { NAuth0Options } from './config';
import ServerNAuth0Client from './server';

export default (opts: NAuth0Options): NAuth0Client => {
  const isBrowser = typeof window !== 'undefined' || (process as any).browser;

  if (isBrowser) {
    return new BrowserNAuth0Client();
  }

  return new ServerNAuth0Client(opts);
};

// export * from './client';
// export * from './lib';
