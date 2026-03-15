import 'server-only';

export async function authenticate(email, password) {
  try {
    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    } else {
      const data = await response.json();
      return {
        id: data.data.user.id,
        email: data.data.user.email,
        name: data.data.user.name,
        createdAt: data.data.user.createdAt,
        token: data.data.token,
      };
    }
  } catch (error) {
    console.error('Erreur lors de la connexion : ', error.message);
  }
}
