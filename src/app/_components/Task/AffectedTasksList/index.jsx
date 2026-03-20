import AffectedTask from '@/app/_components/Task/AffectedTask';
import AffectedTasksListHeader from '@/app/_components/Task/AffectedTasksListHeader';

function AffectedTasksList({ tasks }) {
  return (
    <div className=" bg-white pt-10 pr-10 pb-10 pl-10 rounded-lg flex flex-col gap-4">
      <AffectedTasksListHeader />
      {tasks.map((task) => (
        <AffectedTask key={task.id} task={task} />
      ))}
      <AffectedTask />
    </div>
  );
}

export default AffectedTasksList;
