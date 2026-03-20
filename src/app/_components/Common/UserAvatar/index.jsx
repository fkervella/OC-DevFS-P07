import { getInitials } from '@/app/lib/utils';

function UserAvatar({ name, bgColor, left = 0, zIndex }) {
  return (
    <div
      className={`${bgColor} rounded-full h-full aspect-square flex justify-center items-center relative border border-solid border-white`}
      style={{ left: `-${left}px`, zIndex }}
    >
      <span className="text-sm font-normal text-black-font">
        {getInitials(name)}
      </span>
    </div>
  );
}

export default UserAvatar;
