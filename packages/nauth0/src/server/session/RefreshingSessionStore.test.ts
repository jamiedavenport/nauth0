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

const latestSession: Session = {
  user: {
    id: '1',
  },
  expiresAt: 1,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

jest.useFakeTimers('modern').setSystemTime(1);

describe('RefreshingSessionStore', () => {
  it('should refresh the session when expired', async () => {
    const refreshFunction = jest.fn();
    refreshFunction.mockResolvedValue(latestSession);

    const backingSessionStore = new MemorySessionStore();
    const sessionStore = new RefreshingSessionStore(
      backingSessionStore,
      refreshFunction
    );

    const { req, res } = createMocks();

    await sessionStore.save(req, res, expiredSession);

    expect(await sessionStore.get(req, res)).toEqual(latestSession);
    expect(await sessionStore.get(req, res)).toEqual(latestSession);
    expect(await sessionStore.get(req, res)).toEqual(latestSession);
    expect(refreshFunction).toBeCalledTimes(1);
  });
});
