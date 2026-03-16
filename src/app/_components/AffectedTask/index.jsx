import BlackButton from '@/app/_components/BlackButton';
import TaskInfos from '@/app/_components/TaskInfos';
import TaskStatus from '@/app/_components/TaskStatus';

function AffectedTask() {
  return (
    <div className="border border-solid border-grey-background flex flex-col rounded-lg pt-8 pr-10 pb-8 pl-10">
      <div className="grid grid-cols-2 grid-rows-2">
        <div className="font-manrope text-lg font-semibold text-black col-start-1 row-start-1">
          Nom de la tâche TODO
        </div>
        <TaskStatus status="A faire TODO" />
        <div className="font-inter font-normal text-sm text-grey-font col-start-1 row-start-2">
          Description de la tâche TODO
        </div>
      </div>
      <div className="flex flex-row lg:flex-col justify-start lg:justify-between content-normal">
        <TaskInfos />
        <BlackButton text="Voir" />
      </div>
    </div>
  );
}

export default AffectedTask;
