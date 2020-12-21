import {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
  NextPageContext,
} from 'next';
import { Session } from './lib';

export type Context =
  | Pick<NextPageContext, 'req' | 'res'>
  | {
      req: NextApiRequest;
      res: NextApiResponse;
    };

export interface NAuth0Client {
  handler(): NextApiHandler;
  getSession(ctx: Context): Promise<Session | null>;
}
