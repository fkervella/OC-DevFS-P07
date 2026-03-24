import AffectedTask from '@/app/_components/Task/AffectedTask';
import AffectedTasksListHeader from '@/app/_components/Task/AffectedTasksListHeader';

function AffectedTasksList({ projects, openModal, handleSubmit }) {
  return (
    <div className=" bg-white pt-10 pr-10 pb-10 pl-10 rounded-lg flex flex-col gap-4">
      <AffectedTasksListHeader />

      {projects.map((project) =>
        project.tasks.map((task) => (
          <AffectedTask
            key={task.id}
            task={task}
            projectName={project.name}
            openModal={openModal}
            handleSubmit={handleSubmit}
          />
        ))
      )}
    </div>
  );
}

export default AffectedTasksList;
