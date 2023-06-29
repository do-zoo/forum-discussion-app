import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from 'next/server';
import { withCookie } from './utils/helper';

// const protectedRoutes = ['/profile', '/funding'];
// const authRoutes = ['/login', '/register'];

export async function middleware(req: NextRequest, evt: NextFetchEvent) {
  const { device } = userAgent(req);

  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';

  const cookieOptions = {
    name: 'viewport',
    value: viewport,
  };

  return withCookie(NextResponse.next(), cookieOptions);
}
