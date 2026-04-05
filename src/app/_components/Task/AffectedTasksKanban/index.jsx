import KanbanTasksList from '@/app/_components/Task/KanbanTasksList';
import { getTasksByStatus } from '@/app/lib/utils';
/**
 * AffectedTasksKanban Composant d'affichage sous forme de kanban des tâches affectées à un utilisateur
 *
 * @param {Project[]} projects Liste des projets de l'utilisateur connecté
 * @param {Function} openModal Fonction d'affichage de la fenêtre modale
 * @param {Function} handleSubmitSeeAssignedTask Fonction à appeler lors de la soumission de l'afficahge de tâche
 * @returns {string} Code HTML d'affichage sous forme de kanban des tâches affectées à un utilisateur
 */

function AffectedTasksKanban({
  projects,
  openModal,
  handleSubmitSeeAssignedTask,
}) {
  // Récupération du nombre de tâches par status
  const inProgressTasks = getTasksByStatus(projects, 'IN_PROGRESS');
  const todoTasks = getTasksByStatus(projects, 'TODO');
  const doneTasks = getTasksByStatus(projects, 'DONE');

  return (
    <div className="flex flex-row gap-4">
      <KanbanTasksList
        title="A faire"
        tasks={todoTasks}
        openModal={openModal}
        handleSubmit={handleSubmitSeeAssignedTask}
      />
      <KanbanTasksList
        title="En cours"
        tasks={inProgressTasks}
        openModal={openModal}
        handleSubmit={handleSubmitSeeAssignedTask}
      />
      <KanbanTasksList
        title="Terminées"
        tasks={doneTasks}
        openModal={openModal}
        handleSubmit={handleSubmitSeeAssignedTask}
      />
    </div>
  );
}

export default AffectedTasksKanban;
