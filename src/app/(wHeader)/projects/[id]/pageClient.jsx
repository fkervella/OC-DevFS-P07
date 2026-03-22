'use client';

import Image from 'next/image';
import { useState } from 'react';

import BlackButton from '@/app/_components/Common/BlackButton';
import LeftArrowButton from '@/app/_components/Common/LeftArrowButton';
import PageSubtitle from '@/app/_components/Common/PageSubtitle';
import PageTitle from '@/app/_components/Common/PageTitle';
import Contributors from '@/app/_components/Contributors';
import ModalLayout from '@/app/_components/Modal/ModalLayout';
import ProjectTasksCalendar from '@/app/_components/Project/ProjectTasksCalendar';
import ProjectTasksList from '@/app/_components/Project/ProjectTasksList';
import CreateAskModalContent from '@/app/_components/Task/CreateTaskModalContent';
import useModal from '@/hooks/useModal';

export function ProjectClient({ projectData, projectTasks, userName }) {
  const { modalState, openModal, closeModal } = useModal();
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (formData) => {
    switch (modalState.title) {
      case 'Ajouter une tâche':
        setTasks([...tasks, formData]);
        break;
      default:
        break;
    }
    closeModal();
  };

  if (!projectData) {
    return <div>Chargement ...</div>;
  }

  return (
    <div className="flex flex-col gap-4 mt-4 pt-10 pr-30 pb-10 pl-30 bg-background">
      <LeftArrowButton page="/projects" />
      <div className="grid grid-cols-2 grid-rows-2">
        <PageTitle title={projectData.name} />
        <div>Modifier TODO</div>
        <PageSubtitle subtitle={projectData.description} />
        <BlackButton
          text="Créer une tâche"
          onClick={() =>
            openModal(
              'Ajouter une tâche',
              <CreateAskModalContent onSubmit={handleSubmit} />
            )
          }
        />
        {/* Modale générique */}
        <ModalLayout
          isOpen={modalState.isOpen}
          onClose={closeModal}
          title={modalState.title}
        >
          {modalState.content}
        </ModalLayout>
      </div>
      <Contributors members={projectData.members} owner={userName} />
      <div className="flex flex-col gap-4 bg-white pt-10 pr-10 pb-10 pl-10 border border-solid border-grey-background rounded-lg ">
        <div className="flex flex-row gap-2">
          <div className="text-lg text-black-font font-semibold font-manrope col-start-1 row-start-1">
            Tâches
          </div>
          <div className="text-base text-grey-font font-normal font-inter col-start-1 row-start-2">
            Par ordre de priorité TODO
          </div>
          <div>
            <ul className="flex flex-row gap-4 pl-2">
              <li className="flex flex-row gap-2 pt-3 pl-4 pb-3 pr-4 bg-light-orange rounded-lg">
                <Image
                  src="/tasksOrangeIcon.png"
                  alt="image tâche"
                  width={16}
                  height={16}
                />
                <div className="text-sm font-normal text-orange">Liste</div>
              </li>
              <li className="flex flex-row gap-2 pt-3 pl-4 pb-3 pr-4 bg-white rounded-lg">
                <Image
                  src="/kanbanOrangeIcon.png"
                  alt="image kanban"
                  width={16}
                  height={16}
                />
                <div className="text-sm font-normal text-orange">
                  Calendrier
                </div>
              </li>
            </ul>
          </div>
          <div>Statut</div>
          <div>Rechercher une tâche</div>
        </div>
        <ProjectTasksList tasks={projectTasks} />
        <ProjectTasksCalendar tasks={projectTasks} />
      </div>
    </div>
  );
}

export default ProjectClient;
