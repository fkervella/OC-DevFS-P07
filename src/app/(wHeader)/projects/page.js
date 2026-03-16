import BlackButton from '@/app/_components/BlackButton';
import PageSubtitle from '@/app/_components/PageSubtitle';
import PageTitle from '@/app/_components/PageTitle';
import ProjectCard from '@/app/_components/ProjectCard';

function Projects() {
  return (
    <div className="flex flex-col gap-4 mt-4 pt-10 pr-30 pb-10 pl-30 bg-background">
      <div className="grid grid-cols-2 grid-rows-2">
        <PageTitle title="Mes projets" />
        <PageSubtitle subtitle="Gérez vos projets" />
        <BlackButton text="+ Créer un projet" />
      </div>
      <div className="flex flex-row gap-4">
        <ProjectCard title="A faire" number="4" />
        <ProjectCard title="En cours" number="4" />
        <ProjectCard title="Terminées" number="4" />
      </div>
    </div>
  );
}

export default Projects;
