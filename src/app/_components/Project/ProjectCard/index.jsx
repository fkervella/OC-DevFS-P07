import CardDescription from '@/app/_components/Common/CardDescription';
import CardTitle from '@/app/_components/Common/CardTitle';
import Progress from '@/app/_components/Common/Progress';
import ProjectInfos from '@/app/_components/Project/ProjectInfos';

function ProjectCard({ project }) {
  return (
    <div className="bg-white border border-solid border-grey-background rounded-lg pt-8 pr-10 pb-8 pl-10 max-w-2/7 justify-between">
      <CardTitle title={project.name} />
      <CardDescription description={project.description} />
      <Progress project={project} />
      <ProjectInfos project={project} />
    </div>
  );
}
export default ProjectCard;
