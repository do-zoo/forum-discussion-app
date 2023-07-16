import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from 'next/server';
import { withCookie } from './utils/helpers';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { withAuth } from 'next-auth/middleware';
import { getSession } from './utils/helpers/auth/server';

const protectedRoutes = ['/profile', '/funding'];
const authRoutes = ['/auth'];

export async function middleware(req: NextRequest, evt: NextFetchEvent) {
  const { device } = userAgent(req);

  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';

  const isProtectedRoute = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  );

  const cookieOptions = {
    name: 'viewport',
    value: viewport,
  };

  if (isProtectedRoute) {
    const nextAuthMiddleware = withAuth(
      () => withCookie(NextResponse.next(), cookieOptions),
      {
        callbacks: {
          authorized: ({ token }) => {
            return !!token;
          },
        },
        pages: {
          signIn: '/login',
          error: '/login',
          signOut: '/',
        },
      }
    ) as unknown as (
      req: NextRequest,
      evt: NextFetchEvent
    ) => Promise<NextMiddlewareResult>;

    return nextAuthMiddleware(req, evt);
  }

  const session = await getSession(req.cookies);

  if (isAuthRoute && session?.user) {
    req.nextUrl.pathname = '/';

    return withCookie(NextResponse.redirect(req.nextUrl), cookieOptions);
  }

  return withCookie(NextResponse.next(), cookieOptions);
}
