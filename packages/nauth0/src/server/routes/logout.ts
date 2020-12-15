import { NAuth0ApiRoute } from './route';

export const logoutRoute: NAuth0ApiRoute = (req, res) => {
  // TODO: Implement the logout route
  // https://auth0.com/docs/flows/authorization-code-flow
  // 1. Redirect to Auth0 to logout
  // 2. Void the session cookies

  res.end('Logout');
};
