import Image from 'next/image';

import UserAvatar from '@/app/_components/Common/UserAvatar';
import TaskStatus from '@/app/_components/Task/TaskStatus';

function ProjectInfos({ project }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2">
        <Image src="/teamGreyIcon.png" alt="team icon" width={16} height={14} />
        <div className="text-grey-font text-normal text-xs">
          Equipe({project.members.length + 1})
        </div>
        {/*TODO le calcul n'est pas vraiment exact si administrateur et aussi contributeur*/}
      </div>
      <div className="flex flex-row gap-2 h-8 mt-4">
        <UserAvatar name={project.owner.name} bgColor="bg-light-orange" />
        <TaskStatus status="Propriétaire" />
        {project.members.map((member, index) => (
          <UserAvatar
            key={member.user.id}
            name={member.user.name}
            bgColor="bg-grey-background"
            left={index * 18}
            zIndex={index}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectInfos;
