import { User } from './user';

export interface Session {
  user?: User;
  loading: boolean;
}
