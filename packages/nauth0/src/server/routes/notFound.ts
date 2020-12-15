import { NAuth0ApiRoute } from './route';

export const notFoundRoute: NAuth0ApiRoute = (req, res) => {
  res.status(404).end();
};
