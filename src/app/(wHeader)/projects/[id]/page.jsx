import { getMyProjects, getProjectTasks } from '@/app/actions/project';
import { getSession } from '@/app/lib/session';

import { ProjectClient } from './pageClient';

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
