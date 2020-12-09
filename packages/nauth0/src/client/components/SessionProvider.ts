import React from 'react';
import { Session } from 'src/lib';

// TODO: Implement
export const SessionContext = React.createContext<Session>({
  loading: true,
});

export const SessionProvider = SessionContext.Provider;
