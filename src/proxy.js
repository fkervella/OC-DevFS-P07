import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { decrypt } from '@/app/lib/crypto';

/**
 * publicRoutes liste des routes publiques
 *
 * @type {{}}
 */
const publicRoutes = ['/register', '/', '/login', 'forgotPassword', '/404'];
/**
 * protectedRoutes liste des routes privées/protégées
 *
 * @type {{}}
 */
const protectedRoutes = ['/dashboard', '/profile', '/projects/'];

/**
 * proxy routeur de l'application
 *
 * @export
 * @async
 * @param {string} request page demandée
 * @returns {*} page à afficher
 */

export default async function proxy(request) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

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

/**
 * Description placeholder
 *
 * @type {{ matcher: {}; }}
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
