import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { decrypt } from './app/lib/session';

const publicRoutes = ['/register', '/'];
const protectedRoutes = ['/dashboard', '/profile'];

export default async function proxy(request) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get('session')?.value;
  const session = cookie ? await decrypt(cookie) : null;

  if (!isProtectedRoute && !isPublicRoute) {
    return NextResponse.next();
  } else if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  } else if (
    isPublicRoute &&
    session?.userId &&
    ['/', '/register', '/'].includes(path)
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
