import Image from 'next/image';

/**
 * ListeKanbanSelector Composant d'affichage des boutons de filtrage de la vue
 *
 * @returns {string} Code HTML d'affichage des boutons de liste et kanban
 */

function ListeKanbanSelector() {
  return (
    <ul className="flex flex-row gap-4 pl-2">
      <li className="flex flex-row gap-2 pt-3 pl-4 pb-3 pr-4 bg-light-orange rounded-lg w-fit">
        <Image
          src="/tasksOrangeIcon.png"
          alt="image tâche"
          width={16}
          height={16}
          style={{ width: '100%', height: 'auto' }}
        />
        <div className="text-sm font-normal text-orange">Liste</div>
      </li>
      <li className="flex flex-row gap-2 pt-3 pl-4 pb-3 pr-4 bg-white rounded-lg w-fit">
        <Image
          src="/kanbanOrangeIcon.png"
          alt="image kanban"
          width={16}
          height={16}
          style={{ width: '100%', height: 'auto' }}
        />
        <div className="text-sm font-normal text-orange">Kanban</div>
      </li>
    </ul>
  );
}

export default ListeKanbanSelector;
