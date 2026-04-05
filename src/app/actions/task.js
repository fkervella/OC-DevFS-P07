'use server';

import { getSession } from '@/app/lib/session';

/**
 * Fonction de création d'une tâche
 *
 * @export
 * @async
 * @param {*} formData Données de la tâche issues du formulaire saisi par l'utilisateur
 * @returns {unknown} Données de la tâche
 */

export async function createTask(formData) {
  const token = await getSession();
  const title = formData.get('title');
  const description = formData.get('description');
  const priority = formData.get('priority');
  const dueDate = formData.get('dueDate');
  const state = formData.get('state');
  const projectId = formData.get('projectId');
  const assigneesIdsRaw = formData.get('contributors');
  const contributors = assigneesIdsRaw ? JSON.parse(assigneesIdsRaw) : [];

  if (!token) {
    return {
      success: false,
      error: 'Erreur lors de la récupération du cookie',
    };
  }

  try {
    const assigneeIds = contributors.map((assigneeId) => assigneeId.value);
    const formatedDueDate = new Date(dueDate).toISOString();

    const response = await fetch(
      `http://localhost:8000/projects/${projectId}/tasks`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.user.token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          status: state,
          dueDate: formatedDueDate,
          assigneeIds,
        }),
      }
    );

    const createdTask = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: `${createdTask.error} ${createdTask.message}`,
      };
    }

    return { success: true, task: createdTask };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la création de la tâche : ${error.message}`,
    };
  }
}

/**
 * Fonction de mise à jour d'une tâche
 *
 * @export
 * @async
 * @param {*} formData Données de la tâche issues du formulaire saisi par l'utilisateur
 * @returns {unknown} Données de la tâche
 */

export async function updateTask(formData) {
  const token = await getSession();
  const title = formData.get('title');
  const description = formData.get('description');
  const priority = formData.get('priority');
  const dueDate = formData.get('dueDate');
  const projectId = formData.get('projectId');
  const taskId = formData.get('taskId');
  const state = formData.get('state');
  const assigneesIdsRaw = formData.get('contributors');
  const contributors = assigneesIdsRaw ? JSON.parse(assigneesIdsRaw) : [];

  if (!token) {
    return {
      success: false,
      error: 'Erreur lors de la récupération du cookie',
    };
  }

  try {
    const assigneeIds = contributors.map((assigneeId) => assigneeId.value);
    const formatedDueDate = new Date(dueDate).toISOString();

    const response = await fetch(
      `http://localhost:8000/projects/${projectId}/tasks/${taskId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.user.token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          dueDate: formatedDueDate,
          assigneeIds,
          status: state,
        }),
      }
    );

    const createdTask = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: `${createdTask.error} ${createdTask.message}`,
      };
    }

    return { success: true, task: createdTask };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la mise à jour de la tâche : ${error.message}`,
    };
  }
}

/**
 * Fonction d'ajout d'un commentaire
 *
 * @export
 * @async
 * @param {*} formData Données du commentaire issues du formulaire saisi par l'utilisateur
 * @returns {unknown} Données du commentaire
 */

export async function addComment(formData) {
  const token = await getSession();
  const comment = formData.get('comment');
  const projectId = formData.get('projectId');
  const taskId = formData.get('taskId');

  if (!token) {
    return {
      success: false,
      error: 'Erreur lors de la récupération du cookie',
    };
  }

  try {
    const response = await fetch(
      `http://localhost:8000/projects/${projectId}/tasks/${taskId}/comments`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.user.token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
        }),
      }
    );

    const addedComment = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: `${addedComment.error} ${addedComment.message}`,
      };
    }

    return { success: true, task: addedComment };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la création du commentaire : ${error.message}`,
    };
  }
}
