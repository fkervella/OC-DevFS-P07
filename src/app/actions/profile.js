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
    return {
      success: false,
      error: 'Erreur lors de la récupération du cookie',
    };
  }

  try {
    const response = await fetch('http://localhost:8000/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.user.token}`,
        'content-type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: `${data.error} ${data.message}`,
      };
    } else {
      return {
        user: data.data.user,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la récupération des données de l'utilisateur : ${error.message}`,
    };
  }
}

/**
 * updateProfile fonction de mise à jour des données du profil utilisateur
 *
 * @export
 * @async
 * @param {formData} formData Données issues du formulaire de mise à jour du profil (nom, prénom, email, mot de passe)
 * @returns {*}
 */

export async function updateProfile(formData) {
  const token = await getSession();
  const firstname = formData.get('firstname');
  const lastname = formData.get('lastname');
  const email = formData.get('email');
  const currentPassword = formData.get('currentPassword');
  const newPassword = formData.get('newPassword');
  const name = `${firstname} ${lastname}`;

  if (!token) {
    return { success: false, error: 'Session non trouvée : cookie non trouvé' };
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
      return {
        success: false,
        error: 'Echec de la mise à jour du profil utilisateur',
      };
    }

    await createSession({
      ...token.user,
      name: updatedUser.data.user.name,
      email: updatedUser.data.user.email,
    });

    if (newPassword) {
      const passwordUpdate = await updateProfilePassword(
        currentPassword,
        newPassword
      );

      if (!passwordUpdate.success) return passwordUpdate;
    }

    revalidatePath('/profile');
    return { success: true, user: updatedUser };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la mise à jour du profil utilisateur : ${error.message}`,
    };
  }
}

/**
 * updateProfilePassword fonction de mise à jour du mot de passe de l'utilisateur
 *
 * @export
 * @async
 * @param {string} password Mot de passe de l'utilisateur
 * @returns {*}
 */

export async function updateProfilePassword(currentPassword, newPassword) {
  const token = await getSession();

  if (!token) {
    return { success: false, error: 'Session non trouvée : cookie non trouvé' };
  }

  try {
    const response = await fetch('http://localhost:8000/auth/password', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.user.token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const updatedUser = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: `${updatedUser.error} ${updatedUser.message}`,
      };
    }

    return { success: true, user: updatedUser };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la mise à jour du mot de passe utilisateur : ${error.message}`,
    };
  }
}

export async function getUserByName(inputValue) {
  const token = await getSession();

  if (!token) {
    return { success: false, error: 'Session non trouvée : cookie non trouvé' };
  }

  try {
    const params = new URLSearchParams({ query: inputValue });

    const response = await fetch(
      `http://localhost:8000/users/search?${params}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.user.token}`,
          'content-type': 'application/json',
        },
      }
    );

    const foundUser = await response.json();

    if (!foundUser.success) {
      return {
        success: false,
        error: `${foundUser.error} ${foundUser.message}`,
      };
    }

    return { success: true, users: foundUser.data.users };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la mise à jour du mot de passe utilisateur : ${error.message}`,
    };
  }
}
