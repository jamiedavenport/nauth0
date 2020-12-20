import { User } from './user';

export interface Session {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}
