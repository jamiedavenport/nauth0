import { Context } from '../../client';
import { Session } from '../../lib';
import SessionStore from './SessionStore';

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

  save(ctx: Context, session: Session): Promise<void> {
    return this.sessionStore.save(ctx, session);
  }

  async get(ctx: Context): Promise<Session | null> {
    const session = await this.sessionStore.get(ctx);

    if (!session) {
      return null;
    }

    if (this.isExpired(session)) {
      if (typeof session.refreshToken === 'undefined') {
        return null;
      }

      const refreshedSession = await this.refreshFunction(session);

      await this.save(ctx, refreshedSession);

      return refreshedSession;
    }

    return session;
  }
}
