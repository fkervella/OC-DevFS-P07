import { redirect } from 'next/navigation';

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

  if (!session) redirect('/login');

  // Récupération des données de l'utilisateur
  const userData = await getUserData(session.userId);

  const { id: projectId } = await params;

  const projectsResponse = await getMyProjects();

  if (!projectsResponse.success) return projectsResponse;

  const { projects: myProjects } = projectsResponse;
  const project = myProjects.find((p) => p.id === projectId);
  const isProjectAdministrator = project.userRole === 'ADMIN' ? true : false;

  //TODO rediriger vers une page d'erreur
  if (!project)
    return "L'utilisateur ne fait pas partie des contributeurs du projet.";

  const tasksResponse = await getProjectTasks(project.id);

  if (!tasksResponse.success) return tasksResponse;

  const projectTasks = tasksResponse.tasks;

  return (
    <ProjectClient
      projectDataProp={project}
      projectTasksProp={projectTasks}
      userName={userData.name}
      isProjectAdministrator={isProjectAdministrator}
    />
  );
}

export default ProjectServer;
