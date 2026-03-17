import UserAvatar from '@/app/_components/Common/UserAvatar';

function AssignedTo() {
  return (
    <div className="flex flex-row gap-2">
      <div className="text-grey-font text-inter text-xs font-normal">
        Assigné à :{' '}
      </div>
      <UserAvatar name="BD TODO" />
      <UserAvatar name="Bertrand Dupont TODO" />
      <UserAvatar name="AD TODO" />
      <UserAvatar name="Anne Dupont TODO" />
    </div>
  );
}

export default AssignedTo;
