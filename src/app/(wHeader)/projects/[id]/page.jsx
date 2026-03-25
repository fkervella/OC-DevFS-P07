import { getMyProjects, getProjectTasks } from '@/app/actions/project';
import { getUserData, verifySession } from '@/app/lib/dal';

import { ProjectClient } from './pageClient';

/**
 * ProjectServer Partie serveur de l'afficahge des informations du projet dont l'identifiant est passé en paramètre
 *
 * @async
 * @param {string} param0.params identifiant du projet
 * @returns {ProjectClient} Appel de la partie client pour l'affichage des information du projet dont l'identifiant est passé en paramètre
 */

async function ProjectServer({ params }) {
  // Vérification que la session active est valable
  const session = await verifySession();

  // Récupération des données de l'utilisateur
  const userData = await getUserData(session.userId);

  const { id: projectId } = await params;

  const { projects: myProjects } = await getMyProjects();

  const project = myProjects.find((p) => p.id === projectId);

  const { tasks: projectTasks } = await getProjectTasks({ project });

  return (
    <ProjectClient
      projectData={project}
      projectTasks={projectTasks}
      userName={userData.name}
    />
  );
}

export default ProjectServer;
