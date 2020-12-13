import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'nauth0';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SessionProvider value={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
