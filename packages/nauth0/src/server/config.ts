export interface NAuth0Options {
  issuer: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  redirectUri: string;
  logoutRedirectUri: string;
  postLoginRedirectUri?: string;
  audience?: string;

  session: {
    cookieSecret: string;
    cookieLifetime?: number;
  };
}
