import 'server-only';

import { cookies } from 'next/headers';

import { decrypt, encrypt } from '@/app/lib/crypto';

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

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

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  return decrypt(token);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function refreshSession() {
  const session = await getSession();

  if (!session) return null;

  await createSession(session.userId);

  return session;
}
