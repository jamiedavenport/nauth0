import { useContext, useEffect, useState } from 'react';
import { Session } from 'lib';
import { SessionContext } from './SessionProvider';
import fetch from 'unfetch';

export const useSession = (): [Session, boolean] => {
  const ssrSession = useContext(SessionContext);

  if (ssrSession) {
    return [ssrSession, false];
  }

  return _useSessionHook();
};

const _useSessionHook = (): [Session, boolean] => {
  const [session, setSession] = useState<Session>({});
  const [isLoading, setIsLoading] = useState(true);

  const getSession = async () => {
    setIsLoading(true);

    const res = await fetch('/api/auth/session');

    if (res.ok) {
      const sessionBody = await res.json();

      setSession(sessionBody);
    } else {
      setSession({});
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getSession();
  }, []);

  return [session, isLoading];
};
