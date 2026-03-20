import { getSession } from '@/app/lib/session';

export async function getDashboardAssignedTasks() {
  const token = await getSession();

  if (!token) {
    throw new Error('cookie non trouvé');
  }

  try {
    const response = await fetch(
      'http://localhost:8000/dashboard/assigned-tasks',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.user.token}`,
          'content-type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Echec de la récupération des tâches assignées');
    } else {
      const data = await response.json();
      return {
        tasksid: data.data.tasks,
      };
    }
  } catch (error) {
    console.error('Erreur lors de le tableau de bord : ', error.message);
  }
}
