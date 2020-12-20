# How to Contribute

👋 First off, thanks for taking the time to contribute!

## New to Open Source?

Take a look at [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

Look for issues with the [`good first issue`](https://github.com/jamiedavenport/nauth0/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) tag.

## Development Setup

First you need to fork and clone the repo. Then:

```bash
# Install Deps
yarn

# Run
yarn dev

# Test
yarn test --watch
```

If you're using linux, you will need to install some [dependencies](https://docs.cypress.io/guides/getting-started/installing-cypress.html#Linux) so that [cypress](https://www.cypress.io/) will work for tests.

### Example Application

An example application will be launched at http://localhost:3000. This is already configured with an Auth0 application and you can use it to test your changes. Use the email/password combination below:

```
tester@nauth0.dev
password
```
