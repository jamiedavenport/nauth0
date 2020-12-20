import {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
  NextPageContext,
} from 'next';
import { Session } from './lib';

export type ServerSideRequest =
  | Pick<NextPageContext, 'req'>
  | {
      req: NextApiRequest;
    };

export type ServerSideResponse =
  | Pick<NextPageContext, 'res'>
  | {
      res: NextApiResponse;
    };
export interface NAuth0Client {
  handler(): NextApiHandler;
  getSession(req: ServerSideRequest): Promise<Session | null>;
}
