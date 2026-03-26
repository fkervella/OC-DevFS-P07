import ProjectTaskCard from '@/app/_components/Project/ProjectTaskCard';
import { organizeTasksByPriority } from '@/app/lib/utils';

/**
 * ProjectTaskList Composant d'affichage sous forme de liste des tâches d'un projet
 *
 * @param {tasks[]} tasks tâches du projet
 * @returns {string} Code HTML d'affichage sous forme de liste des tâches d'un projet
 */

function ProjectTasksList({ tasks }) {
  const prioritizedTasks = organizeTasksByPriority({ tasks });

  return (
    <div className="flex flex-col gap-4">
      {prioritizedTasks.map((task) => (
        <ProjectTaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default ProjectTasksList;
