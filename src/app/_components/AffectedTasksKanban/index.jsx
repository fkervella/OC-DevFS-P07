import KanbanTasksList from '@/app/_components/KanbanTasksList';

function AffectedTasksKanban() {
  return (
    <div className="flex flex-row gap-4">
      <KanbanTasksList title="A faire" number="4" />
      <KanbanTasksList title="En cours" number="4" />
      <KanbanTasksList title="Terminées" number="4" />
    </div>
  );
}

export default AffectedTasksKanban;
