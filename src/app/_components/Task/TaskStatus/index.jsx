/**
 * TaskStatus Composant d'affichage du statut d'une tâche
 *
 * @param {string} param0.status Statut de la tâche
 * @returns {string} Code HTML d'afficahge du statut d'une tâche
 */

function TaskStatus({ status }) {
  const statusStyle = {
    DONE: {
      text: 'Terminé',
      bgColor: 'bg-done-background',
      textColor: 'text-done-font',
    },
    IN_PROGRESS: {
      text: 'En cours',
      bgColor: 'bg-pending-background',
      textColor: 'text-pending-font',
    },
    TODO: {
      text: 'A faire',
      bgColor: 'bg-todo-background',
      textColor: 'text-todo-font',
    },
    PROPRIETAIRE: {
      text: 'Propriétaire',
      bgColor: 'bg-todo-background',
      textColor: 'text-todo-font',
    },
  };

  return (
    <div
      className={`flex pr-4 pl-4 ${statusStyle[status].bgColor} ${statusStyle[status].textColor} rounded-full h-full text-sm font-normal items-center w-fit`}
    >
      {statusStyle[status].text}
    </div>
  );
}

export default TaskStatus;
