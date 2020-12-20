import MemorySessionStore from './MemorySessionStore';
import RefreshingSessionStore from './RefreshingSessionStore';
import { createMocks } from 'node-mocks-http';
import { Session } from '../../lib';

const expiredSession: Session = {
  user: {
    id: '1',
  },
  expiresAt: 0,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

const validSession: Session = {
  user: {
    id: '1',
  },
  expiresAt: 1,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

jest.useFakeTimers('modern').setSystemTime(1);

describe('RefreshingSessionStore', () => {
  const refreshFunction = jest.fn().mockResolvedValue(validSession);

  const backingSessionStore = new MemorySessionStore();
  const sessionStore = new RefreshingSessionStore(
    backingSessionStore,
    refreshFunction
  );

  const ctx = createMocks();

  beforeEach(() => {
    refreshFunction.mockClear();
    backingSessionStore.reset();
  });

  it('should refresh the session when expired', async () => {
    await sessionStore.save(ctx, expiredSession);

    expect(await sessionStore.get(ctx)).toEqual(validSession);
    expect(await sessionStore.get(ctx)).toEqual(validSession);
    expect(await sessionStore.get(ctx)).toEqual(validSession);
    expect(refreshFunction).toBeCalledTimes(1);
  });

  it('works when the user is not authenticated', async () => {
    expect(await sessionStore.get(ctx)).toBeNull();
  });

  it('should throw an error when the session is expired and `refreshToken` is missing', async () => {
    const invalidSession: Session = {
      ...expiredSession,
      refreshToken: undefined,
    };
    await sessionStore.save(ctx, invalidSession);

    await expect(sessionStore.get(ctx)).rejects.toMatchInlineSnapshot(
      `[Error: Session has expired and the refreshToken is missing. Did you forget the \`offline_access\` scope?]`
    );
  });
  it('should throw an error when the `expiresAt` is missing', async () => {
    const invalidSession: Session = { ...validSession, expiresAt: undefined };
    await sessionStore.save(ctx, invalidSession);

    await expect(sessionStore.get(ctx)).rejects.toMatchInlineSnapshot(
      `[Error: Missing expiresAt]`
    );
  });
});
