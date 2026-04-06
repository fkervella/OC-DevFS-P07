/**
 * TaskStatus Composant d'affichage du statut d'une tâche
 *
 * @param {string} status Statut de la tâche
 * @param {boolean} selected Statut passé en paramètre sélectionné (dans le cas d'un usage comme un bouton)
 * @returns {string} Code HTML d'afficahge du statut d'une tâche
 */

function TaskStatus({ status, selected = false }) {
  // Sélection du style d'affichage selon le statut passé en paramètre
  const statusStyle = {
    DONE: {
      text: 'Terminée',
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

  // Gestion de l'affichage lorsque le statut est sélectionné
  const selectedStyle = selected ? 'border-2 border-blue-600' : '';

  return (
    <div
      className={`flex pt-1 pr-4 pb-1 pl-4 ${statusStyle[status].bgColor} ${statusStyle[status].textColor} ${selectedStyle} rounded-full text-sm font-normal items-center w-fit h-fit text-nowrap`}
      role="status"
    >
      {statusStyle[status].text}
    </div>
  );
}

export default TaskStatus;
