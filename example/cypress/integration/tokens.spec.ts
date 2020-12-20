// TODO: Generate these from an object instead of jwt.io
const testSessionJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjp7InVzZXIiOnsiaWQiOiIxIn0sImFjY2Vzc1Rva2VuIjoiMWtFRmxaVnFMT2NuM2pQVmdvQ1UtbGUwaFFUaE9QZ0QiLCJyZWZyZXNoVG9rZW4iOiJaNlpMeVBkdlVoWGZvUWhSZ01DaFNfa0x6NWxXcnpLVDBTckVfUmp4eGpwQmMifX0.Yb2vkgG7T6CJq4cMLPsE_v4VT9yL_HEmBOkwNa03Iuc';

describe('Tokens', () => {
  it('Refreshes the `accessToken` when expired', () => {
    // Setup
    // Session set with an expired access token
    cy.setCookie('nauth0:session', testSessionJwt);

    // Action
    // Call to /api/auth/session or getSession
    cy.request('api/auth/session');

    // Assertion
    // Refresh token endpoint is called
  });
});
