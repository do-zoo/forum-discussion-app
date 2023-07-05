import { userService } from '@forum-discussion/services';
import { BASE_URL } from '@forum-discussion/services/base.service';
import { UserDetails } from '@forum-discussion/types/user';
import {
  isValidHttpUrl,
  parseObjectProperty,
} from '@forum-discussion/utils/common';
import { sameOriginPaths } from '@forum-discussion/utils/constants';
import { NextApiRequest } from 'next';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import oAuthProviders from './oauth-providers';

interface LoginCredentialParams {
  newUser: false;
  callbackUrl?: string;
  csrfToken?: string;
  json: string;
  redirect?: boolean;
  email: string;
  password: string;
}

interface RegisterCredentialParams {
  newUser: true;
  callbackUrl?: string;
  csrfToken?: string;
  json: string;
  redirect?: boolean;
  email: string;
  password: string;
  name: string;
}

type CredentialParams = LoginCredentialParams | RegisterCredentialParams;

function configToken(token: unknown) {
  return {
    headers: {
      Authorization: `Bearer ${
        typeof token === 'string' ? token : String(token)
      }`,
      Accept: 'application/json',
    },
  };
}

const signOut = (
  token: JWT,
  reason: string | Record<string, unknown> | null = null
): JWT => ({
  ...token,
  expires_in: undefined,
  token: undefined,
  exp: undefined,
  user: null,
  error: null,
  logoutReason: reason,
});

async function getUserDetails(token: string) {
  return await fetch(BASE_URL + '/users/me', configToken(token)).then(
    async res => {
      if (res.ok) {
        return (await res.json()).data.user as UserDetails;
      }
      return (await res.json()).message as string;
    }
  );
}

export function createOptions(req: NextApiRequest): NextAuthOptions {
  return {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: {
            label: 'Email',
            type: 'text',
          },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          const _credentials = parseObjectProperty(
            credentials || {}
          ) as CredentialParams;

          try {
            // register
            if (_credentials.newUser) {
              const { newUser, ...payload } = _credentials;

              await userService
                .register({
                  ...payload,
                })
                .then(res => res.data);
            }
            // login
            const { newUser, ...payload } = _credentials;
            const user = await userService.login(payload).then(res => {
              return res.data;
            });
            return user;
          } catch (error) {
            console.log(error);

            return null;
          }
        },
      }),
      ...Object.values(oAuthProviders),
    ],
    callbacks: {
      async jwt({ token, user }) {
        const isValidUrl = isValidHttpUrl(req.url);
        let url = '';
        if (isValidUrl) {
          const urlInstance = new URL(req.url as string);
          url = urlInstance.pathname + urlInstance.search;
        }

        if (url === sameOriginPaths.update) {
          if (!token?.token) return token;

          try {
            const response = await getUserDetails(token.token);

            if (!response || typeof response === 'string')
              throw new Error(
                response || "there's something wrong when getting user profile"
              );

            return {
              ...token,
              user: response,
            };
          } catch (err) {
            // logger.error(`next-auth's error occurred ${err}`);
            return {
              ...token,
              error: err as string,
            };
          }
        }

        if (user) {
          token.logoutReason = null;

          try {
            const response = await getUserDetails(user.token || '');

            if (!response || typeof response === 'string')
              throw new Error(
                response || "there's something wrong when getting user profile"
              );

            // console.log('Token: ', token);
            // console.log('User: ', user);

            return {
              ...user,
              user: response,
              error: null,
              logoutReason: null,
            };
          } catch (err) {
            // logger.error(`next-auth's error occurred ${err}`);
            return {
              ...token,
              error: err as string,
            };
          }
        }

        if (token.error) {
          return signOut(token, token.error);
        }

        return token;
      },

      session({ session, token }) {
        return {
          ...token,
          ...session,
        };
      },

      async redirect({ baseUrl, url }) {
        let newUrl = url;
        const callbackUrl = new URL(url).searchParams.get('callbackUrl');

        if (callbackUrl) {
          newUrl = callbackUrl;
        }

        // Allows relative callback URLs
        if (newUrl.startsWith('/')) return `${baseUrl}${newUrl}`;
        // Allows callback URLs on the same origin
        else if (new URL(newUrl).origin === baseUrl) return newUrl;
        return baseUrl;
      },
    },
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: '/login',
      error: '/login',
      signOut: '/',
    },
  };
}
