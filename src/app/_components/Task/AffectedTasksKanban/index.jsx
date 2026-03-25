import KanbanTasksList from '@/app/_components/Task/KanbanTasksList';

/**
 * AffectaedTasksKanban Composant d'affichage sous forme de kanban des tâches affectées à un utilisateur
 *
 * @returns {string} Code HTML d'affichage sous forme de kanban des tâches affectées à un utilisateur
 */

function AffectedTasksKanban() {
  /*TODO*/

  return (
    <div className="flex flex-row gap-4">
      <KanbanTasksList title="A faire" number="4" />
      <KanbanTasksList title="En cours" number="4" />
      <KanbanTasksList title="Terminées" number="4" />
    </div>
  );
}

export default AffectedTasksKanban;
