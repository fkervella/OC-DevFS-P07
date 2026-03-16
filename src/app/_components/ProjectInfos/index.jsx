import Image from 'next/image';

import TaskStatus from '@/app/_components/TaskStatus';
import UserAvatar from '@/app/_components/UserAvatar';

function ProjectInfos() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2">
        <Image
          src="/teamGreyIcon.png"
          alt="team icon"
          width={24}
          height={22}
          className="w-3 h-[11px}"
        />
        <div className="text-grey-font text-normal text-xs">Equipe(TODO)</div>
      </div>
      <div className="flex flex-row gap-2">
        <UserAvatar name="AD TODO" />
        <TaskStatus status="Propriétaire TODO" />
        <UserAvatar name="BC TODO" />
        <UserAvatar name="CV TODO" />
      </div>
    </div>
  );
}

export default ProjectInfos;
