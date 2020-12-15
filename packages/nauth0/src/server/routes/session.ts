import { NAuth0ApiRoute } from './route';
import { getSessionFromReq } from '../../server/session';

export const sessionRoute: NAuth0ApiRoute = async (req, res, opts) => {
  const session = await getSessionFromReq({ req }, opts);

  if (!session) {
    res.status(401).end();
    return;
  }

  res.json(session);
};
