import 'server-only';

/**
 * authenticate Fonction d'authentification de l'utilisateur au back-end
 *
 * @export
 * @async
 * @param {string} email email (identifiant) de l'utilisateur
 * @param {string} password mot de passe de l'utilisateur
 * @returns {{id, email, name, createdAt, token}} en cas de réussite, données de l'utilisateur
 */

export async function authenticate(email, password) {
  try {
    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const loginReturn = await response.json();

    if (!response.ok) {
      throw new Error(`${loginReturn.error} ${loginReturn.message}`);
    } else {
      return {
        user: {
          id: loginReturn.data.user.id,
          email: loginReturn.data.user.email,
          name: loginReturn.data.user.name,
          createdAt: loginReturn.data.user.createdAt,
          token: loginReturn.data.token,
        },
      };
    }
  } catch (error) {
    throw new Error(error.message || 'Erreur inconnue survenue à la connexion');
  }
}
