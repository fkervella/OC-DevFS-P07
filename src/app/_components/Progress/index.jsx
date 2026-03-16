function Progress() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="text-grey-font text-normal text-xs">Progression</div>
        <div className="text-black-font text-normal text-xs">TODO%</div>
      </div>
      <div>TODO BAR</div>
      <div className="text-grey-font text-normal text-xs">
        TODO/TODO tâches terminées
      </div>
    </div>
  );
}

export default Progress;
