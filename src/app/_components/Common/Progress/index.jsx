import { calculateProgressPercentage, getActiveTasks } from '@/app/lib/utils';

async function Progress({ tasks }) {
  if (!tasks) return null;

  const activeTasks = getActiveTasks(tasks);
  const progress = calculateProgressPercentage(tasks);

  const clampedPercentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="flex flex-col mt-10 mb-10">
      <div className="flex flex-row justify-between">
        <div className="text-grey-font text-normal text-xs">Progression</div>
        <div className="text-black-font text-normal text-xs">{progress}%</div>
      </div>
      <div className="w-full h-1.25 bg-grey-background rounded-full overflow-hidden mt-2 mb-1">
        <div
          className="h-full bg-orange rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
      <div className="text-grey-font text-normal text-xs">
        {activeTasks.length}/{tasks.length} tâches terminées
      </div>
    </div>
  );
}

export default Progress;
