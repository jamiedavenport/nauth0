import SignJWT from 'jose/jwt/sign';
import jwtVerify from 'jose/jwt/verify';
import { parseCookies, setCookie } from 'nookies';
import { ServerSideRequest, ServerSideResponse } from '../../client';
import { Session } from '../../lib';
import { NAuth0Options } from '../config';
import { sessionCookie } from '../cookies';
import { SessionStore } from './store';

export class CookieSessionStore implements SessionStore {
  private readonly secret: Uint8Array;

  constructor(private readonly opts: NAuth0Options) {
    this.secret = new TextEncoder().encode(opts.session.cookieSecret);
  }

  private encodeSession(session: Session): Promise<string> {
    return new SignJWT({ session })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(this.secret);
  }

  async save(
    req: ServerSideRequest,
    res: ServerSideResponse,
    session: Session
  ): Promise<void> {
    const encodedSession = await this.encodeSession(session);

    const eightHoursInSeconds = 60 * 60 * 8; // TODO: Handle optional config better
    setCookie(res, sessionCookie, encodedSession, {
      maxAge: this.opts.session.cookieLifetime ?? eightHoursInSeconds,
      httpOnly: true,
      path: '/',
    });
  }

  async get(req: ServerSideRequest): Promise<Session | null> {
    const cookies = parseCookies(req);
    const rawToken = cookies[sessionCookie];

    if (typeof rawToken === 'undefined') {
      return null;
    }

    const { payload } = await jwtVerify(rawToken, this.secret);

    return payload.session;
  }
}
