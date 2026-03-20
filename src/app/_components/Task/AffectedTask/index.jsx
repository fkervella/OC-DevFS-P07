import BlackButton from '@/app/_components/Common/BlackButton';
import CardDescription from '@/app/_components/Common/CardDescription';
import CardTitle from '@/app/_components/Common/CardTitle';
import TaskInfos from '@/app/_components/Task/TaskInfos';
import TaskStatus from '@/app/_components/Task/TaskStatus';

function AffectedTask({ task = [], projectName = '' }) {
  return (
    <div className="border border-solid border-grey-background flex flex-col rounded-lg pt-8 pr-10 pb-8 pl-10">
      <div className="grid grid-cols-2 grid-rows-2">
        <CardTitle title={task.title} />
        <TaskStatus status={task.status} />
        <CardDescription description={task.description} />
      </div>
      <div className="flex flex-row lg:flex-col justify-start lg:justify-between content-normal">
        <TaskInfos task={task} projectName={projectName} />
        <BlackButton text="Voir" />
      </div>
    </div>
  );
}

export default AffectedTask;
