'use server';

import { revalidatePath } from 'next/cache';

import { createSession, getSession } from '@/app/lib/session';

/**
 * getUserProfile Fonction de récupération des données du profil de l'utilisateur connecté
 * Vérification si la session est active
 * Interrogation du back-end
 * Extraction des données à exploiter
 *
 * @export
 * @async
 * @returns {user} en cas de succès données de profil de l'utilisateur connecté
 */

export async function getUserProfile() {
  const token = await getSession();

  if (!token) {
    throw new Error('cookie non trouvé');
  }

  try {
    const response = await fetch('http://localhost:8000/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.user.token}`,
        'content-type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Echec de la récupération des tâches assignées');
    } else {
      const data = await response.json();
      return {
        user: data.data.user,
      };
    }
  } catch (error) {
    console.error('Erreur lors dans le tableau de bord : ', error.message);
  }
}

/**
 * updateProfile fonction de mise à jour des données du profil utilisateur
 *
 * @export
 * @async
 * @param {string} username Nom de l'utilisateur
 * @param {string} email Email de l'utilisateur
 * @returns {*}
 */

export async function updateProfile(formData) {
  const token = await getSession();
  const firstname = formData.get('firstname');
  const lastname = formData.get('lastname');
  const email = formData.get('email');
  const name = `${firstname} ${lastname}`;

  if (!token) {
    throw new Error('Session non trouvée : cookie non trouvé');
  }

  try {
    const response = await fetch('http://localhost:8000/auth/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.user.token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    const updatedUser = await response.json();

    if (!response.ok) {
      throw new Error('Echec de la mise à jour du profil utilisateur');
    }

    await createSession({
      ...token.user,
      name: updatedUser.data.user.name,
      email: updatedUser.data.user.email,
    });

    revalidatePath('/profile');
  } catch (error) {
    console.error(
      'Erreur lors de la mise à jour du profil utilisateur : ',
      error.message
    );
  }
}
