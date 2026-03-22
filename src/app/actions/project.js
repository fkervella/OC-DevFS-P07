import { getSession } from '@/app/lib/session';

export async function getMyProjects() {
  const token = await getSession();

  if (!token) {
    throw new Error('cookie non trouvé');
  }

  try {
    const response = await fetch('http://localhost:8000/projects', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.user.token}`,
        'content-type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Echec de la récupération des projets de l'utilisateur");
    } else {
      const data = await response.json();
      return {
        projects: data.data.projects,
      };
    }
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des projets : ',
      error.message
    );
  }
}

export async function getProjectTasks({ project }) {
  const token = await getSession();

  if (!token) {
    throw new Error('cookie non trouvé');
  }

  try {
    const response = await fetch(
      `http://localhost:8000/projects/${project.id}/tasks`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.user.token}`,
          'content-type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Echec de la récupération des tâches du projet ${project.title}`
      );
    } else {
      const data = await response.json();
      return {
        tasks: data.data.tasks,
      };
    }
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des tâches du projet : ',
      error.message
    );
  }
}

export function getProjectById(jsonData, projectId) {
  // Vérifie si la réponse est un succès et si les données existent
  if (!jsonData.success || !jsonData.data || !jsonData.data.projects) {
    return null;
  }

  // Recherche le projet avec l'ID correspondant
  const project = jsonData.data.projects.find(
    (project) => project.id === projectId
  );

  // Retourne le projet trouvé ou null si non trouvé
  return project || null;
}
