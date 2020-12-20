import { Context } from '../../client';
import { Session } from '../../lib';

export interface SessionStore {
  save(ctx: Context, session: Session): Promise<void>;

  get(ctx: Context): Promise<Session | null>;
}
