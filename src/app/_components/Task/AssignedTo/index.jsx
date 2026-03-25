import UserAvatar from '@/app/_components/Common/UserAvatar';

/**
 * AssignedTo Composant d'affichage du nom des utilisateurs à qui la tâche est affectée
 *
 * @param {assignee[]} param0.assignees Liste des utilisateurs assignés à la tâche
 * @returns {string} Code HTML d'affichage du nom des utilisateurs à qui la tâche est affectée
 */

function AssignedTo({ assignees }) {
  return (
    <div className="flex flex-row gap-2">
      <div className="text-grey-font text-inter text-xs font-normal">
        Assigné à :{' '}
      </div>
      {assignees.map((assignee) => (
        <UserAvatar
          key={assignee.user.id}
          name={assignee.user.name}
          bgColor="bg-grey-background"
        />
      ))}
    </div>
  );
}

export default AssignedTo;
