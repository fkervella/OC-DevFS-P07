import BlackButton from '@/app/_components/BlackButton';
import CardDescription from '@/app/_components/CardDescription';
import CardTitle from '@/app/_components/CardTitle';
import TaskInfos from '@/app/_components/TaskInfos';
import TaskStatus from '@/app/_components/TaskStatus';

function AffectedTask() {
  return (
    <div className="border border-solid border-grey-background flex flex-col rounded-lg pt-8 pr-10 pb-8 pl-10">
      <div className="grid grid-cols-2 grid-rows-2">
        <CardTitle title="Nom de la tâche TODO" />
        <TaskStatus status="A faire TODO" />
        <CardDescription description="Description de la tâche TODO" />
      </div>
      <div className="flex flex-row lg:flex-col justify-start lg:justify-between content-normal">
        <TaskInfos />
        <BlackButton text="Voir" />
      </div>
    </div>
  );
}

export default AffectedTask;
