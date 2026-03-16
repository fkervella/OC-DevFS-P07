function UserAvatar({ name }) {
  return (
    <div className="bg-light-orange rounded-full w-16.25 h-16.25 flex justify-center items-center">
      <span className="text-sm font-normal text-black-font">{name}</span>
    </div>
  );
}

export default UserAvatar;
