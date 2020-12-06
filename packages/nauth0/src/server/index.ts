import { NextApiHandler, NextApiRequest } from 'next';
import { NAuth0Config } from './config';
import { loginRoute } from './routes';

type NAuth0Api = (cfg: NAuth0Config) => NextApiHandler;

// TODO: Fixup types to be more strict e.g. 'callback | login'
// TODO: Edge case: What about when auth is array? Can it be an array? If not change the route from [...auth].ts to [auth].ts?
const getActionFromRequest = (req: NextApiRequest): string => {
  return req.query.auth[0];
};

export const apiHandler: NAuth0Api = (cfg) => async (req, res) => {
  const action = getActionFromRequest(req);

  // TODO: Switch on action and call different routes
  switch (action) {
    case 'login':
      await loginRoute(req, res, cfg);
      break;
    default:
      res.status(404).end();
  }
};

export * from './config';
