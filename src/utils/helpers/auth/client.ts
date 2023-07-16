import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is missing');
}

/**
 * Get current logged in user
 * @desc Server component only
 * @desc We expect this function always return user object
 * @desc Because we already set rewrite inside `middleware.ts`
 * @desc Make sure to only call `getSession` inside authenticated page otherwise it will return `null`
 * @see [Link](https://github.com/nextauthjs/next-auth/issues/5647#issuecomment-1325581888)
 */
export async function getSession() {
  const session = await decode({
    token: cookies()
      .getAll()
      .find(cookie => cookie.name.includes('next-auth.session-token'))?.value,
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  return session;
}
