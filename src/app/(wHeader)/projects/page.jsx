import { getMyProjects, getProjectTasks } from '@/app/actions/project.js';
import { getUserData, verifySession } from '@/app/lib/dal';

import ProjectsClient from './pageClient';

/**
 * ProjectsServer partie serveur pour l'affichage des projets auxquels l'utilisateur participe
 *
 * @async
 * @returns {ProjectsClient} Appel de ProjectsClient pour l'afficahge des projets auxquels d'utilisateur participe
 */

async function ProjectsServer() {
  // Vérification que la session active est valable
  const session = await verifySession();

  // Récupération des données de l'utilisateur
  const userData = await getUserData(session.userId);

  // Récupération des données à afficher dans la page des projets de l'utilisateur
  const { projects } = await getMyProjects();

  const projectsWithTasks = await Promise.all(
    projects.map(async (project) => {
      const { tasks } = await getProjectTasks({ project });
      return { ...project, tasks };
    })
  );

  return (
    <ProjectsClient projects={projectsWithTasks} userName={userData.name} />
  );
}

export default ProjectsServer;
