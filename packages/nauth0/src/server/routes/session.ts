import { NAuth0ApiRoute } from './route';
import { getSessionFromReq } from '../../server/session';

export const sessionRoute: NAuth0ApiRoute = async (req, res, opts) => {
  res.json(await getSessionFromReq({ req }, opts));
};
