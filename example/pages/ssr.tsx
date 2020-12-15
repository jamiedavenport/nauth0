import React from 'react';
import { useSession } from 'nauth0';
import { GetServerSideProps } from 'next';
import nauth0 from 'lib/nauth0';

const Home: React.FC = () => {
  const [session] = useSession();

  const { user } = session;

  return (
    <code>
      <pre>{JSON.stringify(user)}</pre>
    </code>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await nauth0.getSession(ctx);

  // TODO: Handle unauthenticated session

  return {
    props: {
      session,
    },
  };
};

export default Home;
