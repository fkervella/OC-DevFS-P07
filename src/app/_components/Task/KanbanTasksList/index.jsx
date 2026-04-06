import DisplayNumber from '@/app/_components/Common/DisplayNumber';
import AffectedTask from '@/app/_components/Task/AffectedTask';

/**
 * KanbanTasksList Composant d'afficahge de la liste de tâches sous forme de kanban
 *
 * @param {string} title Titre de la liste de tâches
 * @param {tasks[]} tasks Tâches à afficher
 * @param {Function} openModal Fonction d'affichage de la modale
 * @param {Function} handleSubmit Fonction à appeler lors de la soumission du formulaire
 * @returns {string} Code HTML d'afficahge de la liste de tâches sous forme de kanban
 */

function KanbanTasksList({ title, tasks, openModal, handleSubmit }) {
  return (
    <section
      aria-label={`${title}`}
      className="flex flex-col gap-2 bg-white pt-10 pr-10 pb-10 pl-10 rounded-lg border border-solid border-light-orange w-[33%]"
    >
      <div className="flex flex-row gap-4">
        <div className="text-lg text-black-font font-semibold font-manrope ">
          {title}
        </div>
        <DisplayNumber number={tasks.length} />
      </div>
      {tasks.map((task) => (
        <AffectedTask
          key={task.id}
          task={task}
          projectName={task.projectName}
          openModal={openModal}
          handleSubmit={handleSubmit}
        />
      ))}
    </section>
  );
}

export default KanbanTasksList;
