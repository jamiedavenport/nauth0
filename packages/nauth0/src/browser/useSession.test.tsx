import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useSession } from './useSession';
import { SessionProvider } from '../components/SessionProvider';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Session } from 'src/lib';
import '@testing-library/jest-dom'; // TODO: How can I import the type definitions for extend-expect automatically?

const App: React.FC = () => {
  const [session, isLoading] = useSession();

  if (isLoading) return <div>Loading...</div>;

  return <div>{session.user?.id}</div>;
};

describe('useSession', () => {
  const id = 'user-id';

  const server = setupServer(
    rest.get('/api/auth/session', (req, res, ctx) => {
      const session: Session = {
        user: {
          id,
        },
      };
      return res(ctx.json(session));
    })
  );

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('works when SessionProvider is available', () => {
    render(
      <SessionProvider
        value={{
          user: {
            id,
          },
        }}
      >
        <App />
      </SessionProvider>
    );

    expect(screen.getByText(id)).toBeInTheDocument();
  });

  it('works when SessionContext is unavailable', async () => {
    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => screen.getByText(id));
  });
});
