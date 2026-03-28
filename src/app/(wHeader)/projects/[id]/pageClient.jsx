'use client';

import { useState } from 'react';

import BlackButton from '@/app/_components/Common/BlackButton';
import LeftArrowButton from '@/app/_components/Common/LeftArrowButton';
import PageSubtitle from '@/app/_components/Common/PageSubtitle';
import PageTitle from '@/app/_components/Common/PageTitle';
import Contributors from '@/app/_components/Contributors';
import ModalLayout from '@/app/_components/Modal/ModalLayout';
import ListeCalendarSelector from '@/app/_components/Project/ListeCalendarSelector';
import ModifyProjectModalContent from '@/app/_components/Project/ModifyProjectModalContent';
import ProjectTasksCalendar from '@/app/_components/Project/ProjectTasksCalendar';
import ProjectTasksList from '@/app/_components/Project/ProjectTasksList';
import CreateTaskModalContent from '@/app/_components/Task/CreateTaskModalContent';
import { getProjectData, synchronizeMembers } from '@/app/actions/project';
import useModal from '@/hooks/useModal';

/**
 * ProjectClient Partie client pour l'affichage des données d'un projet
 *
 * @export
 * @param {project} param0.projectData Données du projec
 * @param {task[]} param0.projectTasks Liste des tâches du projet
 * @param {string} param0.userName Nom de l'utilisateur connecté
 * @returns {string} Code HTML d'affichage des données d'un projet
 */

export function ProjectClient({ projectDataProp, projectTasks, userName }) {
  const { modalState, openModal, closeModal } = useModal();
  const [projectData, setProjectData] = useState(projectDataProp);
  const [activeTab, setActiveTab] = useState('list');

  const handleSubmit = async (formData) => {
    await synchronizeMembers(
      projectData.id,
      projectData.members,
      formData.members
    );

    const newProjectData = await getProjectData(projectData.id);

    setProjectData(newProjectData);

    closeModal();
  };

  if (!projectData) {
    return <div>Chargement ...</div>;
  }

  return (
    <div className="flex flex-col gap-4 mt-4 pt-10 pr-30 pb-10 pl-30 bg-background">
      <div className="flex flex-row gap-2 justify-between">
        <LeftArrowButton page="/projects" />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <PageTitle title={projectData.name} />
            <a
              href="#"
              onClick={() =>
                openModal(
                  'Modifier un projet',
                  <ModifyProjectModalContent
                    onSubmit={handleSubmit}
                    project={projectData}
                  />
                )
              }
              className="underline text-orange font-inter"
            >
              Modifier
            </a>
          </div>
          <PageSubtitle subtitle={projectData.description} />
        </div>
        <BlackButton
          text="Créer une tâche"
          onClick={() =>
            openModal(
              'Créer une tâche',
              <CreateTaskModalContent onSubmit={handleSubmit} />
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
        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col">
            <div className="text-lg text-black-font font-semibold font-manrope col-start-1 row-start-1">
              Tâches
            </div>
            <div className="text-base text-grey-font font-normal font-inter col-start-1 row-start-2">
              Par ordre de priorité
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-row">
              <ListeCalendarSelector
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            <div>Statut</div>
            <div>Rechercher une tâche</div>
          </div>
        </div>
        {activeTab === 'list' && <ProjectTasksList tasks={projectTasks} />}
        {activeTab === 'calendar' && (
          <ProjectTasksCalendar tasks={projectTasks} />
        )}
      </div>
    </div>
  );
}

export default ProjectClient;
