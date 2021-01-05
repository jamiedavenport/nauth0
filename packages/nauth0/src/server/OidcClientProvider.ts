import { Client, Issuer } from 'openid-client';
import { NAuth0Options } from './config';

export default class OidcClientProvider {
  private client: Client | undefined;

  constructor(private readonly opts: NAuth0Options) {}

  async getClient(): Promise<Client> {
    if (this.client) return this.client;

    const { domain, clientId, clientSecret, redirectUri } = this.opts;

    const issuer = await Issuer.discover(domain);
    this.client = new issuer.Client({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uris: [redirectUri],
      response_types: ['code'],
    });

    return this.client;
  }
}
