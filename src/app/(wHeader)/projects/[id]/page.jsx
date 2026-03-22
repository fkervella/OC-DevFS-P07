import { getMyProjects, getProjectTasks } from '@/app/actions/project';
import { getSession } from '@/app/lib/session';

import { Project } from './pageClient';

async function ProjectServer({ params }) {
  const { id: projectId } = await params;
  console.log('projectId : ', projectId);

  const token = await getSession();
  const userName = token?.user?.name || '';

  const { projects: myProjects } = await getMyProjects();
  console.log('myProjects : ', myProjects);

  const project = myProjects.find((p) => p.id === projectId);

  const { tasks: projectTasks } = await getProjectTasks({ project });

  return (
    <Project
      projectData={project}
      projectTasks={projectTasks}
      userName={userName}
    />
  );
}

export default ProjectServer;
