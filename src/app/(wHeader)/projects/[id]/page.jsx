import { getMyProjects, getProjectTasks } from '@/app/actions/project';
import { getSession } from '@/app/lib/session';

import { ProjectClient } from './pageClient';

/**
 * ProjectServer Partie serveur de l'afficahge des informations du projet dont l'identifiant est passé en paramètre
 *
 * @async
 * @param {string} param0.params identifiant du projet
 * @returns {ProjectClient} Appel de la partie client pour l'affichage des information du projet dont l'identifiant est passé en paramètre
 */

async function ProjectServer({ params }) {
  const { id: projectId } = await params;

  const token = await getSession();
  const userName = token?.user?.name || '';

  const { projects: myProjects } = await getMyProjects();

  const project = myProjects.find((p) => p.id === projectId);

  const { tasks: projectTasks } = await getProjectTasks({ project });

  return (
    <ProjectClient
      projectData={project}
      projectTasks={projectTasks}
      userName={userName}
    />
  );
}

export default ProjectServer;
