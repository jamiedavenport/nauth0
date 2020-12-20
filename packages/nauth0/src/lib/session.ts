import { User } from './user';

export interface Session {
  user?: User;
  expiresAt?: number;
  accessToken?: string;
  refreshToken?: string;
}
