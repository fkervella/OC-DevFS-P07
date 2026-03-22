import ProjectTaskCard from '@/app/_components/Project/ProjectTaskCard';

function ProjectTasksList({ tasks }) {
  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <ProjectTaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default ProjectTasksList;
