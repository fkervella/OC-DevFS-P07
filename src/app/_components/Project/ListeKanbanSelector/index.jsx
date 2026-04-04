import Image from 'next/image';

/**
 * ListeKanbanSelector Composant d'affichage des boutons de filtrage de la vue
 *
 * @param {activeTab} activeTab Nom de l'onglet actif
 * @param {Function} setActiveTab Fonction pour modifier la valeur de l'onglet actif
 * @returns {string} Code HTML d'affichage des boutons de liste et kanban
 */

function ListeKanbanSelector({ activeTab, setActiveTab }) {
  let listStyleBg = '';
  let kanbanStyleBg = '';

  if (activeTab === 'list') {
    listStyleBg = 'bg-light-orange';
    kanbanStyleBg = 'bg-white';
  } else if (activeTab === 'kanban') {
    listStyleBg = 'bg-white';
    kanbanStyleBg = 'bg-light-orange';
  } else {
    listStyleBg = 'bg-light-orange';
    kanbanStyleBg = 'bg-white';
  }
  return (
    <ul className="flex flex-row gap-4 pl-2">
      <li
        className={`flex flex-row gap-2 pt-3 pl-4 pb-3 pr-4 ${listStyleBg} rounded-lg w-fit`}
        onClick={() => setActiveTab('list')}
      >
        <Image
          src="/tasksOrangeIcon.png"
          alt="image tâche"
          width={16}
          height={16}
          className="self-start h-5 w-auto"
        />
        <div className="text-sm font-normal text-orange">Liste</div>
      </li>
      <li
        className={`flex flex-row gap-2 pt-3 pl-4 pb-3 pr-4 ${kanbanStyleBg} rounded-lg w-fit`}
        onClick={() => setActiveTab('kanban')}
      >
        <Image
          src="/kanbanOrangeIcon.png"
          alt="image kanban"
          width={17}
          height={15}
          className="self-start h-5 w-auto"
        />
        <div className="text-sm font-normal text-orange">Kanban</div>
      </li>
    </ul>
  );
}

export default ListeKanbanSelector;
