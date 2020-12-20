import { ServerSideRequest, ServerSideResponse } from '../../client';
import { Session } from '../../lib';
import { SessionStore } from './store';

export default class MemorySessionStore implements SessionStore {
  private session: Session | null = null;

  async save(
    req: ServerSideRequest,
    res: ServerSideResponse,
    session: Session
  ): Promise<void> {
    this.session = session;
  }

  async get(): Promise<Session | null> {
    return this.session;
  }
}
