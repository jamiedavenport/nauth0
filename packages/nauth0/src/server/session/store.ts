import { ServerSideRequest, ServerSideResponse } from '../../client';
import { Session } from '../../lib';

export interface SessionStore {
  save(
    req: ServerSideRequest,
    res: ServerSideResponse,
    session: Session
  ): Promise<void>;

  get(req: ServerSideRequest, res: ServerSideResponse): Promise<Session | null>;
}
