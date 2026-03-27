'use server';

import { getSession } from '@/app/lib/session';

/**
 * getMyProjects Fonction de récupération des données des projects auxquels l'utilisateur connecté participe
 * Vérification si la session est active
 * Interrogation du back-end
 * Extraction des données à exploiter
 *
 * @export
 * @async
 * @returns {project[]} en cas de succès données des projects auxquels l'utilisateur connecté participe
 */

export async function getMyProjects() {
  const token = await getSession();

  if (!token) {
    return {
      success: false,
      error: 'Erreur lors de la récupération du cookie',
    };
  }

  try {
    const response = await fetch('http://localhost:8000/projects', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.user.token}`,
        'content-type': 'application/json',
      },
    });

    const data = await response.json();

    if (!data.success) {
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
      error: `Erreur lors de la récupération des projets : ${error.message}`,
    };
  }
}

/**
 * getProjectTasks Fonction de récupération des données des tâches d'un projet
 * Vérification si la session est active
 * Interrogation du back-end
 * Extraction des données à exploiter
 *
 * @export
 * @async
 * @param {project} project informations du projet duquel récupérer les tâches
 * @returns {task[]} En cas de réussite, tâches du projet passé en paramètre
 */

export async function getProjectTasks({ project }) {
  const token = await getSession();

  if (!token) {
    return {
      success: false,
      error: 'Erreur lors de la récupération du cookie',
    };
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

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: `${data.error} ${data.message}`,
      };
    } else {
      return {
        success: true,
        tasks: data.data.tasks,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la récupération des tâches du projet : ${error.message}`,
    };
  }
}

export async function createProject(formData) {
  const token = await getSession();
  const name = formData.get('title');
  const description = formData.get('description');
  const contributors = formData.get('contributors');

  if (!token) {
    return {
      success: false,
      error: 'Erreur lors de la récupération du cookie',
    };
  }

  try {
    const projectsResponse = getMyProjects();
    if (!projectsResponse.success) return projectsResponse;

    const { projects: myProjects } = projectsResponse;

    const existingProject = myProjects.projects.find(
      (project) => project.name === name && project.description === description
    );

    if (existingProject) {
      return {
        success: false,
        error: 'Un projet avec le même nom et la même description existe déjà',
      };
    }

    const response = await fetch('http://localhost:8000/projects', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.user.token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name, description, contributors }),
    });

    const createdProject = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: `${createdProject.error} ${createdProject.message}`,
      };
    }

    return { success: true, project: createdProject };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la création du projet : ${error.message}`,
    };
  }
}
