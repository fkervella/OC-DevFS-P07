import DisplayNumber from '@/app/_components/Common/DisplayNumber';
import AffectedTask from '@/app/_components/Task/AffectedTask';

function KanbanTasksList({ title, number }) {
  return (
    <div className="flex flex-col gap-2 bg-white pt-10 pr-10 pb-10 pl-10 rounded-lg border border-solid border-light-orange ">
      <div className="flex flex-row gap-4">
        <div className="text-lg text-black-font font-semibold font-manrope ">
          {title}
        </div>
        <DisplayNumber number={number} />
      </div>
      <AffectedTask />
    </div>
  );
}

export default KanbanTasksList;
