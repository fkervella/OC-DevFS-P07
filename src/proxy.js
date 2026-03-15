import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { decrypt } from '@/app/lib/crypto';

const publicRoutes = ['/register', '/', '/login', 'forgotPassword', '/404'];
const protectedRoutes = ['/dashboard', '/profile', '/projects', '/projet'];

export default async function proxy(request) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get('session')?.value;
  const session = cookie ? await decrypt(cookie) : null;

  if (!isProtectedRoute && !isPublicRoute) {
    // La page demandée n'est pas connue
    return NextResponse.redirect(new URL('/404', request.nextUrl));
  } else if (isProtectedRoute && !session?.user?.id) {
    // La page demandée fait partie des routes protégées, et aucun utilisateur n'est connecté
    return NextResponse.redirect(new URL('/', request.nextUrl));
  } else if (isProtectedRoute && session?.user?.id) {
    // La page demandée est protégée et l'utilisateur est connecté
    return NextResponse.next();
  } else if (request.nextUrl.pathname.startsWith('/login')) {
    // La page login est la page d'acceuil.
    return NextResponse.redirect(new URL('/', request.nextUrl));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
