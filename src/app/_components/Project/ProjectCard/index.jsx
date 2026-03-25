import CardDescription from '@/app/_components/Common/CardDescription';
import CardTitle from '@/app/_components/Common/CardTitle';
import Progress from '@/app/_components/Common/Progress';
import ProjectInfos from '@/app/_components/Project/ProjectInfos';

/**
 * ProjectCard Composant d'afficahge des données d'un projet sous forme de carte
 *
 * @param {project} project Données du projet
 * @param {tasks[]} tasks tâches du projet
 * @returns {string} Code HTML d'affichage des données d'un projet
 */

function ProjectCard({ project, tasks }) {
  return (
    <div className="bg-white border border-solid border-grey-background rounded-lg pt-8 pr-10 pb-8 pl-10 max-w-2/7 justify-between">
      <a href={`/projects/${project.id}/`}>
        <CardTitle title={project.name} />
        <CardDescription description={project.description} />
        <Progress tasks={tasks} />
        <ProjectInfos project={project} />
      </a>
    </div>
  );
}
export default ProjectCard;
