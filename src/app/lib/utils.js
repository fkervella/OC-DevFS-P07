/**
 * getInitials focntion renvoyant les initiales de l'information passée en paramètre
 *
 * @export
 * @param {string} fullName Nom complet de l'utilisateur
 * @returns {string} les initiales du nom passé en paramètre
 */

export function getInitials(fullName) {
  return fullName
    .trim()
    .split(' ')
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

/**
 * getActiveTasks fonction de filtrage des tâches au status DONE
 *
 * @export
 * @param {task[]} tasks Liste de tâches
 * @returns {task[]} Liste des tâches filtrée
 */

export function getActiveTasks(tasks) {
  return tasks.filter((task) => task.status !== 'DONE');
}

/**
 * getTasksByStatus fonction de filtrage des tâches des projets suivant le statut indiqué
 *
 * @export
 * @param {project[]} projects Liste de projets
 * @param {string} status statut recherché
 * @returns {tasks[]} Liste de tâches filtrée
 */

export function getTasksByStatus(projects, status) {
  const tasks = [];

  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (task.status === status) {
        tasks.push({
          projectName: project.name,
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          projectId: task.projectId,
          creatorId: task.creatorId,
          assignees: task.assignees,
          comments: task.comments,
        });
      }
    });
  });

  return tasks;
}

/**
 * calculateProgressPercentage fonction de calcul de la progression d'un projet à partir du statut de ses tâches
 *
 * @export
 * @param {task[]} tasks Liste de tâches
 * @returns {number} Pourcentage d'avancement des tâches
 */

export function calculateProgressPercentage(tasks) {
  // Vérification que les données d'entrée soient consistentes
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return 0;
  }

  // Mapping des statuts vers leurs pourcentages
  const statusProgress = {
    DONE: 100,
    IN_PROGRESS: 50,
    TODO: 0,
  };

  // Calcul de la somme des progressions
  const totalProgress = tasks.reduce((sum, task) => {
    const progress = statusProgress[task.status] ?? 0;
    return sum + progress;
  }, 0);

  // Calcul du pourcentage moyen
  const averageProgress = totalProgress / tasks.length;

  return Math.round(averageProgress);
}

/**
 * formatDateFR fonction de formatage de la date passée en paramètre, au format français
 *
 * @export
 * @param {string} isoString date à formatter
 * @returns {string} date formattée
 */

export function formatDateFR(isoString) {
  try {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      return null;
    }

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  } catch (error) {
    console.error('Erreur de formatage:', error);
    return null;
  }
}

/**
 * getProjectById fonction de renvoi d'un projet à partir de son identifiant
 *
 * @export
 * @param {project[]} projects données des projets
 * @param {string} projectId identifiant du projet
 * @returns {project} en cas de réussite, données du projet
 */

export function getProjectById(projects, projectId) {
  // Vérifie si la réponse est un succès et si les données existent
  if (!projects.success || !projects.data || !projects.data.projects) {
    return null;
  }

  // Recherche le projet avec l'ID correspondant
  const project = projects.data.projects.find(
    (project) => project.id === projectId
  );

  // Retourne le projet trouvé ou null si non trouvé
  return project || null;
}

export function organizeProjectsTasksByPriority(tasks) {
  const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
  const tasksByPriority = { HIGH: [], MEDIUM: [], LOW: [] };

  tasks.projects.forEach((project) => {
    project.tasks.forEach((task) => {
      const priority = task.priority;
      tasksByPriority[priority].push({
        projectName: project.name,
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        projectId: task.projectId,
        creatorId: task.creatorId,
        assignees: task.assignees,
        comments: task.comments,
      });
    });
  });

  // Trier les tâches par priorité
  const sortedTasks = [];
  Object.keys(tasksByPriority)
    .sort((a, b) => priorityOrder[a] - priorityOrder[b])
    .forEach((priority) => {
      sortedTasks.push(...tasksByPriority[priority]);
    });

  return sortedTasks;
}

export function organizeTasksByPriority(tasks) {
  const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };

  const sortedTasks = tasks.tasks.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return sortedTasks;
}
