import UserAvatar from '@/app/_components/Common/UserAvatar';
import TaskStatus from '@/app/_components/Task/TaskStatus';

function Team() {
  return (
    <div className="flex flex-row justify-between rounded-lg bg-grey2-background ">
      <div className="flex flex-row gap-2 items-center">
        <div className="font-manrope text-black text-lg font-semibold">
          Contributeurs
        </div>
        <div className="font-inter text-grey-font font-normal text-lg">
          3 personnes
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <UserAvatar name="AD TODO" />
        <TaskStatus status="Propriétaire TODO" />
        <UserAvatar name="BD TODO" />
        <UserAvatar name="Bertrand Dupont TODO" />
        <UserAvatar name="AD TODO" />
        <UserAvatar name="Anne Dupont TODO" />
      </div>
    </div>
  );
}

export default Team;
