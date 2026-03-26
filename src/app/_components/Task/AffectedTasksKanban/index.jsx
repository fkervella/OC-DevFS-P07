import KanbanTasksList from '@/app/_components/Task/KanbanTasksList';
import { getTasksByStatus } from '@/app/lib/utils';
/**
 * AffectedTasksKanban Composant d'affichage sous forme de kanban des tâches affectées à un utilisateur
 *
 * @returns {string} Code HTML d'affichage sous forme de kanban des tâches affectées à un utilisateur
 */

function AffectedTasksKanban({ projects, openModal, handleSubmit }) {
  const inProgressTasks = getTasksByStatus(projects, 'IN_PROGRESS');
  const todoTasks = getTasksByStatus(projects, 'TODO');
  const doneTasks = getTasksByStatus(projects, 'DONE');

  return (
    <div className="flex flex-row gap-4">
      <KanbanTasksList
        title="A faire"
        tasks={todoTasks}
        openModal={openModal}
        handleSubmit={handleSubmit}
      />
      <KanbanTasksList
        title="En cours"
        tasks={inProgressTasks}
        openModal={openModal}
        handleSubmit={handleSubmit}
      />
      <KanbanTasksList
        title="Terminées"
        tasks={doneTasks}
        openModal={openModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default AffectedTasksKanban;
