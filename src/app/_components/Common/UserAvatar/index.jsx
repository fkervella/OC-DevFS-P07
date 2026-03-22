import { getInitials } from '@/app/lib/utils';

function UserAvatar({
  name = 'undefined',
  bgColor = 'bg-light-orange',
  textColor = 'text-black-font',
  left = 0,
  zIndex = 0,
  withUserName = false,
}) {
  return (
    <>
      <div
        className={`${bgColor} rounded-full h-full aspect-square flex justify-center items-center relative border border-solid border-white`}
        style={{ left: `-${left}px`, zIndex }}
      >
        <span className={`text-sm font-normal ${textColor}`}>
          {getInitials(name)}
        </span>
      </div>
      {withUserName && (
        <div
          className={`${bgColor} rounded-full h-full aspect-square flex justify-center items-center relative border border-solid border-white`}
          style={{ left: `-${left}px`, zIndex }}
        >
          <span className={`text-sm font-normal ${textColor}`}>{name}</span>
        </div>
      )}
    </>
  );
}

export default UserAvatar;
