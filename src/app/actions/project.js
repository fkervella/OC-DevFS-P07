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
  const membersRaw = formData.get('contributors');
  const members = membersRaw ? JSON.parse(membersRaw) : [];

  if (!token) {
    return {
      success: false,
      error: 'Erreur lors de la récupération du cookie',
    };
  }

  try {
    const projectsResponse = await getMyProjects();
    if (!projectsResponse.success) return projectsResponse;

    const { projects: myProjects } = projectsResponse;

    const existingProject = myProjects.find(
      (project) => project.name === name && project.description === description
    );

    if (existingProject) {
      return {
        success: false,
        error: 'Un projet avec le même nom et la même description existe déjà',
      };
    }

    const normalizedMembers = Array.isArray(members)
      ? members
      : members
        ? [members]
        : [];

    const membersMap = new Map(
      normalizedMembers.map((member) => [String(member.value), member])
    );

    const contributors = [];
    for (const [memberData] of membersMap) {
      contributors.push(memberData.email);
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

export async function updateProject(formData) {
  const token = await getSession();
  const id = formData.get('projectId');
  const name = formData.get('title');
  const description = formData.get('description');

  if (!token) {
    return {
      success: false,
      error: 'Erreur lors de la récupération du cookie',
    };
  }

  try {
    const response = await fetch(`http://localhost:8000/projects/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.user.token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });

    const updatedProject = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: `${updatedProject.error} ${updatedProject.message}`,
      };
    }

    return { success: true, project: updatedProject };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la mise à jour du projet : ${error.message}`,
    };
  }
}
export async function getProjectData(projectId) {
  const projectsResponse = await getMyProjects();

  if (!projectsResponse.success) return projectsResponse;

  const { projects: myProjects } = projectsResponse;
  const project = myProjects.find((p) => p.id === projectId);

  return project;
}
/**
 * Synchronise la liste des membres en comparant l'état initial et l'état final.
 * Appelle addMember pour les nouveaux membres et deleteMember pour les supprimés.
 *
 * @param {Array} initialMembers - Liste initiale [{ id, userId }]
 * @param {Array} finalMembers - Liste finale [{ label, value }] où value correspond à userId
 * @returns {Promise<void>}
 */

export async function synchronizeMembers(
  projectId,
  initialMembers,
  finalMembers
) {
  // 1. Créer des Sets pour une recherche rapide (O(1))
  // On extrait les userIds de la liste initiale
  const initialUsers = new Map(
    initialMembers.map((member) => [String(member.userId), member])
  );

  // On extrait les userIds de la liste finale (la propriété 'value' correspond au userId)
  const finalUsers = new Map(
    finalMembers.map((member) => [String(member.value), member])
  );

  // 2. Identifier les suppressions : présents dans initial mais absents dans final
  const usersToRemove = [];
  for (const userId of initialUsers.keys()) {
    if (!finalUsers.has(userId)) {
      usersToRemove.push(userId);
    }
  }

  // 3. Identifier les ajouts : présents dans final mais absents dans initial
  // On filtre ceux qui ne sont pas dans le Set initial
  const usersToAdd = [];
  for (const [userId, memberData] of finalUsers) {
    if (!initialUsers.has(userId)) {
      usersToAdd.push({
        userId: userId,
        userEmail: memberData.email,
      });
    }
  }

  // 4. Exécuter les suppressions
  // On utilise Promise.all pour exécuter les suppressions en parallèle si elles sont asynchrones
  const removalPromises = usersToRemove.map((userId) =>
    deleteMember(projectId, userId)
  );
  await Promise.all(removalPromises);

  // 5. Exécuter les ajouts
  const additionPromises = usersToAdd.map((member) =>
    addMember(projectId, member.value, member.userEmail)
  );
  await Promise.all(additionPromises);
}

export async function addMember(projectId, userId, userEmail) {
  const token = await getSession();

  if (!token) {
    return {
      success: false,
      error: 'Erreur lors de la récupération du cookie',
    };
  }

  try {
    const response = await fetch(
      `http://localhost:8000/projects/${projectId}/contributors`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.user.token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ id: userId, email: userEmail }),
      }
    );

    const addedContributor = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: `${addedContributor.error} ${addedContributor.message}`,
      };
    }

    return { success: true, contributor: addedContributor };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de l'ajout du contributeur ${userEmail} : ${error.message}`,
    };
  }
}

export async function deleteMember(projectId, userId) {
  const token = await getSession();

  if (!token) {
    return {
      success: false,
      error: 'Erreur lors de la récupération du cookie',
    };
  }

  try {
    const response = await fetch(
      `http://localhost:8000/projects/${projectId}/contributors/${userId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.user.token}`,
          'content-type': 'application/json',
        },
      }
    );

    const deletedContributor = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: `${deletedContributor.error} ${deletedContributor.message}`,
      };
    }

    return { success: true, contributor: deletedContributor };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la suppression du contributeur ${userId} : ${error.message}`,
    };
  }
}
