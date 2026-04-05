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
  // Récupération des informations de l'utilisateur connecté
  const token = await getSession();

  if (!token) throw new Error('Erreur lors de la récupération du cookie');

  try {
    const response = await fetch('http://localhost:8000/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.user.token}`,
        'content-type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.error} ${data.message}`);

    return { user: data.data.user };
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération des données de l'utilisateur : ${error.message}`
    );
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

  // Récupération des informations de l'utilisateur connecté
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

    // Mise à jour des données du cookie lors de la mise à jour du profil utilisateur
    await createSession({
      ...token.user,
      name: updatedUser.data.user.name,
      email: updatedUser.data.user.email,
    });

    // Si saisie du mot de passe, enregistrement de celui-ci
    if (newPassword) {
      const passwordUpdate = await updateProfilePassword(
        currentPassword,
        newPassword
      );

      if (!passwordUpdate.success) return passwordUpdate; // TODO bizarre
    }

    revalidatePath('/profile');
    return { user: updatedUser };
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
 * @param {string} currentPassword Mot de passe actuel de l'utilisateur
 * @param {string} newPassword Nouveau mot de passe de l'utilisateur
 * @returns {*}
 */

export async function updateProfilePassword(currentPassword, newPassword) {
  // Récupération des informations de l'utilisateur connecté
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

    if (!response.ok)
      if (!response.ok) {
        return {
          success: false,
          error: `${updatedUser.error} ${updatedUser.message}`,
        };
      }

    return { user: updatedUser };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la mise à jour du mot de passe utilisateur : ${error.message}`,
    };
  }
}

/**
 * Récupération de l'utilisateur selon son nom
 *
 * @export
 * @async
 * @param {string} inputValue nom de l'utilisateur
 * @returns {unknown}
 */

export async function getUserByName(inputValue) {
  // Récupération des informations de l'utilisateur connecté
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

/**
 * Fonction d'enregistrement d'un utilisateur dans le backend
 *
 * @export
 * @async
 * @param {*} formData Données de l'utilisateur (nom, email, mot de passe)
 * @returns {unknown}
 */

export async function registerUser(formData) {
  const name = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const registeredUser = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: `${registeredUser.error} ${registeredUser.message}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la mise à jour du profil utilisateur : ${error.message}`,
    };
  }
}
