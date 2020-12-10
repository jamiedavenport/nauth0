import base64url from 'base64url';
import { randomBytes } from 'crypto';
import { Client, Issuer } from 'openid-client';
import { NAuth0Config } from './config';

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

export const createClient = async (opts: NAuth0Config): Promise<Client> => {
  const issuer = await Issuer.discover(`https://${opts.domain}/`);
  const client = new issuer.Client({
    client_id: opts.clientId,
    client_secret: opts.clientSecret,
    redirect_uris: [opts.redirectUri],
    response_types: ['code'],
  });

  return client;
};
