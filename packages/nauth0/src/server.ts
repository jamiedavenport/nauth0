// import { NextApiHandler, NextApiRequest } from "next";
// import { NAuth0Client } from "./client";
// import { NAuth0Options } from "./config";
// import { Session } from "./lib";
// import { callbackRoute, loginRoute, logoutRoute, NAuth0ApiRoute, notFoundRoute, sessionRoute } from "./routes";

class ServerNAuth0Client implements NAuth0Client {
  constructor(private readonly opts: NAuth0Options) {}

  handler(): NextApiHandler {
    // // TODO: Fixup types to be more strict e.g. 'callback | login'
    // // TODO: Edge case: What about when auth is array? Can it be an array? If not change the route from [...auth].ts to [auth].ts?
    // const getActionFromRequest = (req: NextApiRequest): string => {
    //   return req.query.auth as string;
    // };

    // const getApiRoute = (action: string): NAuth0ApiRoute => {
    //   switch (action) {
    //     case 'login':
    //       return loginRoute;
    //     case 'callback':
    //       return callbackRoute;
    //     case 'logout':
    //       return logoutRoute;
    //     case 'session':
    //       return sessionRoute;
    //     default:
    //       return notFoundRoute;
    //   }
    // };

    // const apiHandler: NextApiHandler = async (req, res) => {
    //   const action = getActionFromRequest(req);

    //   const route = getApiRoute(action);
    //   await route(req, res, this.opts);
    // };

    // return apiHandler;

    throw new Error('Method not implemented');
  }

  getSession(): Session {
    throw new Error('Method not implemented.');
  }
}

export default ServerNAuth0Client;
