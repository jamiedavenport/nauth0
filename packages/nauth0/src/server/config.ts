export interface NAuth0Config {
  domain: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  redirectUri: string;
  audience?: string;
}
