import { Context } from '../../client';
import { Session } from '../../lib';
import SessionStore from './SessionStore';

export default class MemorySessionStore implements SessionStore {
  private session: Session | null = null;

  async save(ctx: Context, session: Session): Promise<void> {
    this.session = session;
  }

  async get(): Promise<Session | null> {
    return this.session;
  }

  reset(): void {
    this.session = null;
  }
}
