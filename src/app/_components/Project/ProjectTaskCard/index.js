import CardDescription from '@/app/_components/Common/CardDescription';
import CardTitle from '@/app/_components/Common/CardTitle';
import Date from '@/app/_components/Common/Date';
import DetailsButton from '@/app/_components/Common/DetailsButton';
import ExpandButton from '@/app/_components/Common/ExpandButton';
import AssignedTo from '@/app/_components/Task/AssignedTo';
import Comments from '@/app/_components/Task/Comments';
import TaskStatus from '@/app/_components/Task/TaskStatus';

function ProjectTaskCard({ task }) {
  return (
    <div className="bg-white border border-solid border-grey-background rounded-lg pt-8 pr-10 pb-8 pl-10">
      <CardTitle title={task.title} />
      <TaskStatus status={task.status} />
      <DetailsButton page="/TODOprojects" />
      <CardDescription description={task.description} />
      <Date date={task.dueDate} />
      <AssignedTo assignees={task.assignees} />
      <div className="w-full border-t border-grey-background my-8"></div>
      <Comments number={task.comments.length} />
      <ExpandButton page="/TODOprojects" />
    </div>
  );
}

export default ProjectTaskCard;
