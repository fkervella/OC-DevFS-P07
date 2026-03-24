export function getInitials(fullName) {
  return fullName
    .trim()
    .split(' ')
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function getActiveTasks(tasks) {
  return tasks.filter((task) => task.status !== 'DONE');
}

export function calculateProgressPercentage(tasks) {
  // Vérification de sécurité
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
