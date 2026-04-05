import UserAvatar from '@/app/_components/Common/UserAvatar';
import TaskStatus from '@/app/_components/Task/TaskStatus';

/**
 * Composant d'affichage des contributeurrs d'un projet
 *
 * @param {member[]} members Nom des membres du projet
 * @param {string} owner Nom du propriétaire du projet
 * @returns {string} Code HTML d'affichage des contributeurs d'un projet
 */

function Contributors({ members = [], owner }) {
  const membersNumber = members.length;

  return (
    <div className="flex flex-row justify-between rounded-lg bg-grey2-background pt-5 pr-10 pb-5 pl-10">
      <div className="flex flex-row gap-2 items-center">
        <div className="font-manrope text-black text-lg font-semibold">
          Contributeurs
        </div>
        <div className="font-inter text-grey-font font-normal text-lg">
          {membersNumber} personnes
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 h-fit ">
        <UserAvatar name={owner} bgColor="bg-light-orange" size="small" />
        <TaskStatus status="PROPRIETAIRE" />
        {members.map((member) => (
          <UserAvatar
            key={member.user.id}
            name={member.user.name}
            bgColor="bg-grey-background"
            withUserName={true}
            size="small"
          />
        ))}
      </div>
    </div>
  );
}

export default Contributors;
