import AffectedTask from '@/app/_components/AffectedTask';
import AffectedTasksListHeader from '@/app/_components/AffectedTasksListHeader';

function AffectedTasksList() {
  return (
    <div className=" bg-white pt-10 pr-10 pb-10 pl-10 rounded-lg">
      <AffectedTasksListHeader />
      <AffectedTask />
    </div>
  );
}

export default AffectedTasksList;
