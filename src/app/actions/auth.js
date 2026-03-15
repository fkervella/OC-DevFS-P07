'use server';

import { redirect } from 'next/navigation';

import { authenticate } from '@/app/lib/auth';
import { createSession, deleteSession } from '@/app/lib/session';

export async function LoginAction(formData) {
  const user = await authenticate(
    formData.get('email'),
    formData.get('password')
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  await createSession(user);

  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();

  redirect('/login');
}
