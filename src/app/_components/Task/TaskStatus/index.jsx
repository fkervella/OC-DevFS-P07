/**
 * TaskStatus Composant d'affichage du statut d'une tâche
 *
 * @param {string} param0.status Statut de la tâche
 * @returns {string} Code HTML d'afficahge du statut d'une tâche
 */

function TaskStatus({ status }) {
  return (
    <div className="flex pr-4 pl-4 bg-light-orange text-orange rounded-full h-full text-sm font-normal items-center">
      {status}
    </div>
  );
}

export default TaskStatus;
