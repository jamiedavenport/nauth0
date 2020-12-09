import { NextApiHandler, NextApiRequest } from 'next';
import { NAuth0Config } from './config';
import {
  callbackRoute,
  loginRoute,
  logoutRoute,
  NAuth0ApiRoute,
  notFoundRoute,
  sessionRoute,
} from './routes';

type NAuth0Api = (cfg: NAuth0Config) => NextApiHandler;

// TODO: Fixup types to be more strict e.g. 'callback | login'
// TODO: Edge case: What about when auth is array? Can it be an array? If not change the route from [...auth].ts to [auth].ts?
const getActionFromRequest = (req: NextApiRequest): string => {
  return req.query.auth as string;
};

const getApiRoute = (action: string): NAuth0ApiRoute => {
  switch (action) {
    case 'login':
      return loginRoute;
    case 'callback':
      return callbackRoute;
    case 'logout':
      return logoutRoute;
    case 'session':
      return sessionRoute;
    default:
      return notFoundRoute;
  }
};

export const apiHandler: NAuth0Api = (cfg) => async (req, res) => {
  const action = getActionFromRequest(req);

  const route = getApiRoute(action);
  await route(req, res, cfg);
};

export * from './config';
