# `nauth0`

Easy and awesome authentication for NextJS applications using Auth0.

**This project is a WIP and is likely to include breaking changes**

## Installation

Install the dependencies:

```
yarn add nauth0 @nauth0/server
```

Add `/pages/api/auth/[auth].ts` to your NextJS application.

```ts
import nauth0 from '@nauth0/server';

export default nauth0({
  domain: 'Auth0 Domain',
  clientId: 'Auth0 Client ID',
  clientSecret: 'Auth0 Client Secret',
  scope: 'openid profile',
});
```

The Auth0 Domain, Client ID and Client Secret can be found by creating the application within the Auth0 dashboard.

## Auth0 Configuration

Create a new Regular Web Application with the following settings:

- Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
- Allowed Logout URLs: `http://localhost:3000/`

## Features

- Written in Typescript
- Uses Auth0
- Simple setup
- Simple API
- Hooks
- SSR support
- Works well with custom APIs

## Client API

### `useSession`

Client-side only!

### `getSession`

Server-side & Client-side!

### `SessionProvider`

`SessionProvider` allows the user session to be shared across the application and injected on the server-side to avoid loading screens. Highly recommended!

```ts
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
```

## Rest API

### `/api/auth/login`

### `/api/auth/logout`

### `/api/auth/callback`

### `/api/auth/session`

## Contributing

### Contributors
