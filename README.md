# `nauth0`

Easy and awesome authentication for NextJS applications using Auth0.

**This project is a WIP and is likely to include breaking changes**

## Quick Start

Install the dependencies:

```
yarn add nauth0
```

Add `/pages/api/auth/[...auth].ts` to your NextJS application.

```ts
import { nauth0 } from 'nauth0';

export default nauth0({});
```

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

## Rest API

### `/api/auth/login`

### `/api/auth/logout`

### `/api/auth/callback`

### `/api/auth/session`

## Contributing

### Contributors
