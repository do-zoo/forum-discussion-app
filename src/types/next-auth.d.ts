import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';
import { LoginResponse, UserDetails } from './user';

declare module 'next-auth' {
  interface User extends LoginResponse {
    error?: string | null;
    logoutReason?: string | Record<string, unknown> | null;
    id?: string | undefined;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession, LoginResponse {
    user: UserDetails | null;
    error?: string | null;
    logoutReason?: string | Record<string, unknown> | null;
    id?: string | undefined;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends LoginResponse {
    error?: string | null;
    logoutReason?: string | Record<string, unknown> | null;
    id?: string | undefined;
    user: UserDetails | null;
  }
}
