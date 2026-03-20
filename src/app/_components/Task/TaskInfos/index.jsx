import Image from 'next/image';

function TaskInfos({ className, task = [] }) {
  return (
    <div className={className}>
      <div className="flex flex-row gap-2">
        <Image
          src="/projectsGreyIcon.png"
          alt="Logo Abricot orange"
          width={18}
          height={14}
          className="self-start h-3.5 w-4.5"
        />
        <div className="font-inter font-normal text-xs text-grey-font">
          {task?.project?.name}
        </div>
        <div className="font-inter font-normal text-xs text-grey-font"> | </div>
        <Image
          src="/kanbanGreyIcon.png"
          alt="Logo Abricot orange"
          width={16}
          height={18}
          className="self-start h-4.5 w-4"
        />
        <div className="font-inter font-normal text-xs text-grey-font">
          {task.dueDate} TODO
        </div>
        <div className="font-inter font-normal text-xs text-grey-font"> | </div>
        <Image
          src="/messageGreyIcon.png"
          alt="Logo Abricot orange"
          width={15}
          height={15}
          className="self-start h-3.75 w-3.75"
        />
        <div className="font-inter font-normal text-xs text-grey-font">
          {task?.comments?.length} TODO
        </div>
      </div>
    </div>
  );
}

export default TaskInfos;
