import { getMyProjects, getProjectTasks } from '@/app/actions/project.js';
import { getSession } from '@/app/lib/session';

import ProjectsClient from './pageClient';

async function ProjectsServer() {
  //const session = await verifySession()

  // Fetch user-specific data from your database or data source
  //const user = await getUserData(session.userId)

  const token = await getSession();
  const userName = token ? token.user.name : '';

  const { projects } = await getMyProjects();

  const projectsWithTasks = await Promise.all(
    projects.map(async (project) => {
      const { tasks } = await getProjectTasks({ project });
      return { ...project, tasks };
    })
  );

  return <ProjectsClient projects={projectsWithTasks} userName={userName} />;
}

export default ProjectsServer;
