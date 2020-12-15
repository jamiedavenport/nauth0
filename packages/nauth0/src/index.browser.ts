/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NAuth0Client } from './client';

export default (): NAuth0Client => {
  return new (require('./client').default)();
};

export * from './browser';
