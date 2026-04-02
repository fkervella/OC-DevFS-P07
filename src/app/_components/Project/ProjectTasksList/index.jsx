import ProjectTaskCard from '@/app/_components/Project/ProjectTaskCard';
import { organizeTasksByPriority } from '@/app/lib/utils';

/**
 * ProjectTaskList Composant d'affichage sous forme de liste des tâches d'un projet
 *
 * @param {tasks[]} tasks tâches du projet
 * @returns {string} Code HTML d'affichage sous forme de liste des tâches d'un projet
 */

function ProjectTasksList({
  tasks,
  openModal,
  handleSubmitModifyTask,
  username,
  projectId,
}) {
  const prioritizedTasks = organizeTasksByPriority({ tasks });

  return (
    <div className="flex flex-col gap-4">
      {prioritizedTasks.map((task) => (
        <ProjectTaskCard
          key={task.id}
          task={task}
          openModal={openModal}
          handleSubmitModifyTask={handleSubmitModifyTask}
          username={username}
          projectId={projectId}
        />
      ))}
    </div>
  );
}

export default ProjectTasksList;
