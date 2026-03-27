import { getSession } from '@/app/lib/session';

/**
 * getDashboardProjectsTasks Fonction de récupération des données projects et tâches à afficher dans le tableau de bord
 * Vérification si la session est active
 * Interrogation du back-end
 * Extraction des données à exploiter
 * @export
 * @async
 * @returns {project[]} données des projets en cas de succès
 */

export async function getDashboardProjectsTasks() {
  const token = await getSession();

  if (!token) {
    return {
      success: false,
      error: 'Erreur lors de la récupération du cookie',
    };
  }

  try {
    const response = await fetch(
      'http://localhost:8000/dashboard/projects-with-tasks',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.user.token}`,
          'content-type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: `${data.error} ${data.message}`,
      };
    } else {
      return {
        success: true,
        projects: data.data.projects,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la récupération des projets avec leurs tâches : ${error.message}`,
    };
  }
}
