import 'server-only';

import { cookies } from 'next/headers';

import { decrypt, encrypt } from '@/app/lib/crypto';

/**
 * SESSION_DURATION Durée de vie de la session utilisateur
 *
 * @type {number}
 */
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

/**
 * createSession fonction de création de la session et de la sauvegarde du cookie
 *
 * @export
 * @async
 * @param {*} user données de l'utilisateur
 * @returns {*} pas de retour
 */
export async function createSession(user) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  const session = await encrypt({ user, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * getSession fonction de récupération de la session à partir du cookie
 *
 * @export
 * @async
 * @returns {*} en cas de réussite, données du token contenu dans le cookie
 */

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  return decrypt(token);
}

/**
 * deleteSession fonction de suppression du cookie de session
 *
 * @export
 * @async
 * @returns {*} pa de retour
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

/**
 * refreshSession Fonction permettant de rafraîchir la session
 *
 * @export
 * @async
 * @returns {session} données du cookie
 */

export async function refreshSession() {
  const session = await getSession();

  if (!session) return null;

  await createSession(session.userId);

  return session;
}
