import { NextApiHandler, NextApiRequest } from 'next';
import { NAuth0Client } from '../client';
import { NAuth0Options } from './config';
import { Session } from '../lib';
import routes from './routes';

class ServerNAuth0Client implements NAuth0Client {
  constructor(private readonly opts: NAuth0Options) {}

  private getActionFromRequest(req: NextApiRequest): string {
    return req.query.auth as string;
  }

  handler(): NextApiHandler {
    const apiHandler: NextApiHandler = async (req, res) => {
      const action = this.getActionFromRequest(req);
      const handler = routes(action);
      await handler(req, res, this.opts);
    };

    return apiHandler;
  }

  getSession(): Session {
    // TODO:

    throw new Error('Method not implemented.');
  }
}

export default ServerNAuth0Client;
export * from './config';
