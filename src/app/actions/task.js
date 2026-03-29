'use server';

import { getProjectTasks } from '@/app/actions/project';
import { getSession } from '@/app/lib/session';

export async function createTask(formData) {
  const token = await getSession();
  const title = formData.get('title');
  const description = formData.get('description');
  const priority = formData.get('priority');
  const dueDate = formData.get('dueDate');
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
    const tasksResponse = await getProjectTasks(projectId);
    if (!tasksResponse.success) return tasksResponse;

    const { tasks } = tasksResponse;

    const existingTask = tasks.find(
      (task) => task.title === title && task.description === description
    );

    if (existingTask) {
      return {
        success: false,
        error: 'Une tâche avec le même nom et la même description existe déjà',
      };
    }

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
