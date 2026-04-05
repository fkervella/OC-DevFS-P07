'use server';

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
  // Récupération des informations de l'utilisateur connecté
  const token = await getSession();

  if (!token) {
    throw new Error('Erreur lors de la récupération du cookie');
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
      throw new Error(`${data.error} ${data.message}`);
    } else {
      return { projects: data.data.projects };
    }
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération des projets avec leurs tâches : ${error.message}`
    );
  }
}
