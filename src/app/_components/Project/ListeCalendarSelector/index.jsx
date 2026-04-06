import Image from 'next/image';

/**
 * ListeCalendarSelector Composant d'affichage des boutons de filtrage de la vue
 *
 * @param {activeTab} activeTab Nom de l'onglet actif
 * @param {Function} setActiveTab Fonction pour modifier la valeur de l'onglet actif
 * @returns {string} Code HTML d'affichage des boutons de liste et clanddrier
 */

function ListeCalendarSelector({ activeTab, setActiveTab }) {
  // Définition des couleurs de fond des bouton en fonction de l'onglet sélectionné
  let listStyleBg = '';
  let calendarStyleBg = '';

  if (activeTab === 'list') {
    listStyleBg = 'bg-light-orange';
    calendarStyleBg = 'bg-white';
  } else if (activeTab === 'calendar') {
    listStyleBg = 'bg-white';
    calendarStyleBg = 'bg-light-orange';
  } else {
    listStyleBg = 'bg-light-orange';
    calendarStyleBg = 'bg-white';
  }

  return (
    <div className="flex flex-row gap-4 pl-2" role="tablist">
      <button
        className={`flex flex-row gap-2 pt-3 pl-4 pb-3 pr-4 ${listStyleBg} rounded-lg w-fit h-fit cursor-pointer`}
        onClick={() => setActiveTab('list')}
        role="tab"
        aria-selected={activeTab === 'list'}
      >
        <Image
          src="/tasksOrangeIcon.png"
          alt="image tâche"
          width={16}
          height={16}
          className="self-start"
        />
        <div className="text-sm font-normal text-orange">Liste</div>
      </button>
      <button
        className={`flex flex-row gap-2 pt-3 pl-4 pb-3 pr-4 ${calendarStyleBg} rounded-lg w-fit h-fit cursor-pointer`}
        onClick={() => setActiveTab('calendar')}
        role="tab"
        aria-selected={activeTab === 'list'}
      >
        <Image
          src="/kanbanOrangeIcon.png"
          alt="image kanban"
          width={15}
          height={17}
          className="self-start"
        />
        <div className="text-sm font-normal text-orange">Calendrier</div>
      </button>
    </div>
  );
}

export default ListeCalendarSelector;
