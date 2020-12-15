export interface NAuth0Options {
  domain: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  redirectUri: string;
  audience?: string;

  session: {
    cookieSecret: string;
    cookieLifetime?: number;
  };
}
