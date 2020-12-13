import React from 'react';
import { useSession } from 'nauth0';

const Home: React.FC = () => {
  const [session, isLoading] = useSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { user } = session;

  if (!user) {
    return <a href="/api/auth/login">Login</a>;
  }

  return (
    <code>
      <pre>{JSON.stringify(user)}</pre>
    </code>
  );
};

export default Home;
