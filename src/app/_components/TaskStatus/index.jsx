function TaskStatus({ status }) {
  return (
    <div className="col-start-2 row-start-1 pr-2 pl-2 bg-light-orange text-red-font rounded-lg h-fit w-fit text-sm font-normal">
      {status}
    </div>
  );
}

export default TaskStatus;
