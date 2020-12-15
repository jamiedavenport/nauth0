import { NextApiHandler, NextApiRequest, NextPageContext } from 'next';
import { Session } from './lib';

export type GetSessionOpts =
  | Pick<NextPageContext, 'req'>
  | {
      req: NextApiRequest;
    };

export interface NAuth0Client {
  handler(): NextApiHandler;
  getSession(req: GetSessionOpts): Promise<Session | null>;
}
