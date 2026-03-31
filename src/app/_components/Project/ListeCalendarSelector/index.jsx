import Image from 'next/image';

/**
 * ListeCalendarSelector Composant d'affichage des boutons de filtrage de la vue
 *
 * @param {activeTab} activeTab Nom de l'onglet actif
 * @param {Function} setActiveTab Fonction pour modifier la valeur de l'onglet actif
 * @returns {string} Code HTML d'affichage des boutons de liste et clanddrier
 */

function ListeCalendarSelector({ activeTab, setActiveTab }) {
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
    <ul className="flex flex-row gap-4 pl-2">
      <li
        className={`flex flex-row gap-2 pt-3 pl-4 pb-3 pr-4 ${listStyleBg} rounded-lg w-fit h-fit`}
        onClick={() => setActiveTab('list')}
      >
        <Image
          src="/tasksOrangeIcon.png"
          alt="image tâche"
          width={17}
          height={15}
          className="self-start h-5 w-auto"
        />
        <div className="text-sm font-normal text-orange">Liste</div>
      </li>
      <li
        className={`flex flex-row gap-2 pt-3 pl-4 pb-3 pr-4 ${calendarStyleBg} rounded-lg w-fit h-fit`}
        onClick={() => setActiveTab('calendar')}
      >
        <Image
          src="/kanbanOrangeIcon.png"
          alt="image kanban"
          width={17}
          height={15}
          className="self-start h-5 w-auto"
        />
        <div className="text-sm font-normal text-orange">Calendrier</div>
      </li>
    </ul>
  );
}

export default ListeCalendarSelector;
