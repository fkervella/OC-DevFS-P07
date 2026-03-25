'use server';

import { redirect } from 'next/navigation';

import { authenticate } from '@/app/lib/auth';
import { createSession, deleteSession } from '@/app/lib/session';

/**
 * LoginAction vérification de l'identifiant et du mot de passe utilisateur lors de la connexion
 * Tentative d'authentification au backend
 * Création d'un cookie pour stocker le token
 *
 * @export
 * @async
 * @param {*} formData Données du formulaire de connexion utilisateur
 * @returns {*} Redirection vers la page dashboard en cas de succès
 */

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

/**
 * logout Déconnexion de l'utilisateur
 * Supperssion du cookie
 *
 * @export
 * @async
 * @returns {*}  Rediction vers la page de login
 */

export async function logout() {
  await deleteSession();

  redirect('/login');
}
