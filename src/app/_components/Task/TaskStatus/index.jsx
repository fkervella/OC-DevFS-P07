function TaskStatus({ status }) {
  return (
    <div className="flex pr-4 pl-4 bg-light-orange text-orange rounded-full h-full text-sm font-normal items-center">
      {status}
    </div>
  );
}

export default TaskStatus;
