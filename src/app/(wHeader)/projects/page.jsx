'use server';

import { redirect } from 'next/navigation';

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
  if (!session) redirect('/login');

  // Récupération des données de l'utilisateur
  const userData = await getUserData(session.userId);
  if (!userData)
    throw new Error('Echec de la récupération des informations utilisateur');

  // Récupération des données à afficher dans la page des projets de l'utilisateur
  const projectsResponse = await getMyProjects();
  const { projects } = projectsResponse;

  const projectsWithTasks = await Promise.all(
    projects
      .filter((project) => project && project.id)
      .map(async (project) => {
        const projectTasksResponse = await getProjectTasks(project.id);
        const { tasks: tasks } = projectTasksResponse;
        return { ...project, tasks };
      })
  );

  return (
    <ProjectsClient projectsProp={projectsWithTasks} userName={userData.name} />
  );
}

export default ProjectsServer;
