import base64url from 'base64url';
import { randomBytes } from 'crypto';

export const createState = (
  stateObject: Record<string, unknown> = {}
): string => {
  stateObject.nonce = createNonce();
  return encodeState(stateObject);
};

export const createNonce = (): string => randomBytes(16).toString('hex');

export const encodeState = (stateObject: Record<string, unknown>): string =>
  base64url.encode(JSON.stringify(stateObject));

export const decodeState = (stateValue: string): Record<string, unknown> =>
  JSON.parse(base64url.decode(stateValue));
