import { NAuth0ApiRoute } from './route';

export const callbackRoute: NAuth0ApiRoute = (req, res) => {
  // TODO: Implement the callback route
  // https://auth0.com/docs/flows/authorization-code-flow
  // 1. Fetch state cookie
  // 2. Decode and exchange for tokens
  // 3. Save the session cookie

  res.end('Callback');
};
