import CardDescription from '@/app/_components/Common/CardDescription';
import CardTitle from '@/app/_components/Common/CardTitle';
import Progress from '@/app/_components/Common/Progress';
import ProjectInfos from '@/app/_components/Project/ProjectInfos';

function ProjectCard() {
  return (
    <div className="bg-white border border-solid border-grey-background rounded-lg pt-8 pr-10 pb-8 pl-10 max-w-2/7 justify-between">
      <CardTitle title="Nom du projet" />
      <CardDescription description="Développement de la nouvelle version de l'API REST avec authentification JWT" />
      <Progress />
      <ProjectInfos />
    </div>
  );
}
export default ProjectCard;
