import 'server-only';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { cache } from 'react';

import { decrypt } from '@/app/lib/crypto';
import { getSession } from '@/app/lib/session';

/**
 * Description placeholder
 *
 * @type {*}
 */
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!session.user.id) {
    return NextResponse.redirect(new URL('/login'));
  }

  return { isAuth: true, userId: session.userId };
});

/**
 * Description placeholder
 *
 * @type {*}
 */
export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
});

/**
 * getUserData récupération des données de l'utilsateur depuis  le cookie de session
 *
 * @export
 * @returns {user} données de l'utilisateur
 */

export const getUserData = cache(async () => {
  const token = await getSession();
  const userData = token ? token.user : null;

  return userData;
});
