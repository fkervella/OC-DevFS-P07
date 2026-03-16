import CardDescription from '@/app/_components/CardDescription';
import CardTitle from '@/app/_components/CardTitle';
import Progress from '@/app/_components/Progress';
import ProjectInfos from '@/app/_components/ProjectInfos';

function ProjectCard() {
  return (
    <div className="bg-white border border-solid border-grey-background rounded-lg pt-8 pr-10 pb-8 pl-10">
      <CardTitle title="Nom du projet" />
      <CardDescription description="Développement de la nouvelle version de l'API REST avec authentification JWT" />
      <Progress />
      <ProjectInfos />
    </div>
  );
}
export default ProjectCard;
