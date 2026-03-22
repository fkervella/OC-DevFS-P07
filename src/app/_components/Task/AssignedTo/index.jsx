import UserAvatar from '@/app/_components/Common/UserAvatar';

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
