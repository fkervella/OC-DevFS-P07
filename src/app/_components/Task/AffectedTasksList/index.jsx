import AffectedTask from '@/app/_components/Task/AffectedTask';
import AffectedTasksListHeader from '@/app/_components/Task/AffectedTasksListHeader';
import { organizeTasksByPriority } from '@/app/lib/utils';

/**
 * AffectedTaskList Composant d'affichage sous forme de liste des tâches affectées à un utilisateur
 *
 * @param {project[]} param0.projects Liste des projets avec des tâches affectées à un utilisateur
 * @param {Function} param0.openModal Fonction d'affichage de la fenêtre modale
 * @param {Function} param0.handleSubmit Fonction exécutée à la validation de la fenêtre modale
 * @returns {string} Code HTML d'affichage sous forme de liste des tâches affectées à un utilisateur
 */

function AffectedTasksList({ projects, openModal, handleSubmit }) {
  const prioritizedTasks = organizeTasksByPriority({ projects });

  return (
    <div className=" bg-white pt-10 pr-10 pb-10 pl-10 rounded-lg flex flex-col gap-4">
      <AffectedTasksListHeader />
      {prioritizedTasks.map((task) => (
        <AffectedTask
          key={task.id}
          task={task}
          projectName={task.projectName}
          openModal={openModal}
          handleSubmit={handleSubmit}
        />
      ))}
    </div>
  );
}

export default AffectedTasksList;
