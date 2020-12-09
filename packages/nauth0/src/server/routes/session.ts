import { NAuth0ApiRoute } from './route';

export const sessionRoute: NAuth0ApiRoute = (req, res) => {
  // TODO: Implement the session route
  // 1. Read session from the cookie (session store)

  res.end('session');
};
