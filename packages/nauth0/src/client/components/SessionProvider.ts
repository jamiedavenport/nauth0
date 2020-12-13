import React from 'react';
import { Session } from 'src/lib';

export const SessionContext = React.createContext<Session | undefined>(
  undefined
);

export const SessionProvider = SessionContext.Provider;
