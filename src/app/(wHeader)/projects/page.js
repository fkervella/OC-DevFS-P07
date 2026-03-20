import BlackButton from '@/app/_components/Common/BlackButton';
import PageSubtitle from '@/app/_components/Common/PageSubtitle';
import PageTitle from '@/app/_components/Common/PageTitle';
import ProjectCard from '@/app/_components/Project/ProjectCard';
import { getMyProjects } from '@/app/actions/project.js';

async function Projects() {
  const { projects } = await getMyProjects();

  return (
    <div className="flex flex-col gap-4 mt-4 pt-10 pr-30 pb-10 pl-30 bg-background">
      <div className="grid grid-cols-2 grid-rows-2">
        <PageTitle title="Mes projets" />
        <PageSubtitle subtitle="Gérez vos projets" />
        <BlackButton text="+ Créer un projet" />
      </div>
      <div className="flex flex-row gap-4 flex-wrap">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
