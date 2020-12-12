import React from 'react';
import { useSession } from 'nauth0/dist/client';

const Home: React.FC = () => {
  const [session, isLoading] = useSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { user } = session;

  if (!user) {
    return <a href="/api/auth/login">Login</a>;
  }

  return <div>Hello, {user.id}</div>;
};

export default Home;
