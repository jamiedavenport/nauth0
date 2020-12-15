import { callbackRoute } from './callback';
import { loginRoute } from './login';
import { logoutRoute } from './logout';
import { notFoundRoute } from './notFound';
import { NAuth0ApiRoute } from './route';
import { sessionRoute } from './session';

export default (action: string): NAuth0ApiRoute => {
  switch (action) {
    case 'login':
      return loginRoute;
    case 'callback':
      return callbackRoute;
    case 'logout':
      return logoutRoute;
    case 'session':
      return sessionRoute;
    default:
      return notFoundRoute;
  }
};
