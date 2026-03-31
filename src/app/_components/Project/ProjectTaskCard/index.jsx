import Image from 'next/image';
import { useState } from 'react';

import CardDescription from '@/app/_components/Common/CardDescription';
import CardTitle from '@/app/_components/Common/CardTitle';
import Date from '@/app/_components/Common/Date';
import ExpandButton from '@/app/_components/Common/ExpandButton';
import UserAvatar from '@/app/_components/Common/UserAvatar';
import Comments from '@/app/_components/Task/Comments';
import ModifyTaskModalContent from '@/app/_components/Task/ModifyTaskModalContent';
import TaskStatus from '@/app/_components/Task/TaskStatus';

/**
 * ProjectTaskCard Composant d'affichage des données d'une tâche d'un projet
 *
 * @param {task} task Données de la tâche d'un projet
 * @returns {string} Code HTML d'afficahge des données d'une tâche
 */

function ProjectTaskCard({ task, openModal, handleSubmitModifyTask }) {
  const [isVisibleComment, setIsVisibleComment] = useState(false);
  const [buttonRotation, setButtonRotation] = useState(false);

  const handleSubmitCommentsVisibility = () => {
    setIsVisibleComment(!isVisibleComment);
    setButtonRotation(!buttonRotation);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col bg-white border border-solid border-grey-background rounded-lg pt-8 pr-10 pb-8 pl-10 justify-between">
        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <CardTitle title={task.title} />
              <TaskStatus status={task.status} />
            </div>
            <div className="mt-6 mb-2">
              <CardDescription description={task.description} />
            </div>
            <div className="mt-2 mb-2">
              <Date date={task.dueDate} />
            </div>
            <div className="flex flex-row gap-2 h-fit items-center">
              <div className="text-grey-font text-inter text-xs font-normal">
                Assigné à :{' '}
              </div>
              {task.assignees.map((member) => (
                <UserAvatar
                  key={member.user.id}
                  name={member.user.name}
                  bgColor="bg-grey-background"
                  withUserName={true}
                />
              ))}
            </div>
          </div>
          <div className="items-start">
            <button
              href="#"
              onClick={() =>
                openModal(
                  'Modifier',
                  <ModifyTaskModalContent
                    task={task}
                    onSubmit={handleSubmitModifyTask}
                  />
                )
              }
            >
              <div className="border border-solid border-grey-background bg-white rounded-lg w-14.25 h-14.25 flex justify-center items-center">
                <Image
                  src="/3DotsGreyIcon.png"
                  alt="Bouton retour"
                  width={16}
                  height={8}
                  className="w-auto h-auto"
                />
              </div>
            </button>
          </div>
        </div>
        <div className="w-full border-t border-grey-background my-8"></div>
        <div className="flex flex-row gap-2 justify-between">
          <Comments
            comments={task.comments}
            isVisibleComment={isVisibleComment}
          />
          <div className="items-start">
            <ExpandButton
              handleSubmit={handleSubmitCommentsVisibility}
              rotation={buttonRotation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectTaskCard;
