import { createState, decodeState } from './oidc';

describe('oidc', () => {
  describe('createState', () => {
    it('should create a base64 encoded state string', () => {
      const redirectTo = 'http://localhost:3000/callback';

      const state = createState({
        redirectTo,
      });

      expect(state).toBeTruthy();

      const decoded = decodeState(state);
      expect(decoded.redirectTo).toEqual(redirectTo);
      expect(decoded.nonce).toBeTruthy();
    });
  });
});
