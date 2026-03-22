function UserName({ name, bgColor }) {
  return (
    <div
      className={`${bgColor} rounded-lg size-fit aspect-square flex justify-center items-center relative border border-solid border-white flex-nowrap `}
    >
      <span className="text-sm font-normal text-black-font">{name}</span>
    </div>
  );
}

export default UserName;
