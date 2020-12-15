/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NAuth0Client } from './client';
import { NAuth0Options } from './server';

export default (opts: NAuth0Options): NAuth0Client => {
  return new (require('./client').default)(opts);
};

export * from './browser';
