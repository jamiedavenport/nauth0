import { ServerSideRequest, ServerSideResponse } from '../../client';
import { Session } from '../../lib';
import { SessionStore } from './store';

export interface RefreshFunction {
  (currentSession: Session): Promise<Session>;
}

export default class RefreshingSessionStore implements SessionStore {
  constructor(
    private readonly sessionStore: SessionStore,
    private readonly refreshFunction: RefreshFunction
  ) {}

  private isExpired({ expiresAt }: Session): boolean {
    if (typeof expiresAt === 'undefined') {
      throw new Error('Missing expiresAt'); // TODO: Throw specific error so that the caller can make a decision on what to do
    }

    // TODO: What about clock skew?
    return expiresAt * 1000 < Date.now();
  }

  save(
    req: ServerSideRequest,
    res: ServerSideResponse,
    session: Session
  ): Promise<void> {
    return this.sessionStore.save(req, res, session);
  }

  async get(
    req: ServerSideRequest,
    res: ServerSideResponse
  ): Promise<Session | null> {
    const session = await this.sessionStore.get(req, res);

    if (!session) {
      return null;
    }

    if (this.isExpired(session)) {
      const refreshedSession = await this.refreshFunction(session);

      await this.save(req, res, refreshedSession);

      return refreshedSession;
    }

    return session;
  }
}
