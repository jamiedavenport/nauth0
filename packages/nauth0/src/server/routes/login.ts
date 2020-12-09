import { NAuth0ApiRoute } from './route';

export const loginRoute: NAuth0ApiRoute = (req, res) => {
  // TODO: Implement the login route
  // https://auth0.com/docs/flows/authorization-code-flow
  // 1. Create OIDC client
  // 2. Generate the authorization state and URL
  // 3. Set state in cookie to compare when redirecting
  // 4. Redirect to the authorization URL

  res.end('Login');
};
