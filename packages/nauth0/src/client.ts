import { NextApiHandler, NextApiRequest, NextPageContext } from 'next';
import { Session } from './lib';

export interface NAuth0Client<> {
  handler(): NextApiHandler;
  getSession(
    req:
      | Pick<NextPageContext, 'req'>
      | {
          req: NextApiRequest;
        }
  ): Promise<Session>;
}
