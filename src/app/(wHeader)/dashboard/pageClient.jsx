'use client';

import { useState } from 'react';

import BlackButton from '@/app/_components/Common/BlackButton';
import ModalLayout from '@/app/_components/Modal/ModalLayout';
import CreateProjectModalContent from '@/app/_components/Project/CreateProjectModalContent';
import ListeKanbanSelector from '@/app/_components/Project/ListeKanbanSelector';
import AffectedTasksKanban from '@/app/_components/Task/AffectedTasksKanban';
import AffectedTasksList from '@/app/_components/Task/AffectedTasksList';
import { getDashboardProjectsTasks } from '@/app/actions/dashboard';
import useModal from '@/hooks/useModal';
/**
 * DashboardClient partie client pour l'affichage du tableau de bord d'un utilisateur
 *
 * @param {project[]} projects Liste des projets de l'utilisateur
 * @param {string} userName Nom de l'utilisateur
 * @returns {string} Code HTML pour l'affichage du tableau de bord d'un utilisateur
 */

function DashboardClient({ projectsProp, userName }) {
  const { modalState, openModal, closeModal, renderContent } = useModal();
  const [activeTab, setActiveTab] = useState('list');
  const [projects, setProjects] = useState(projectsProp);

  const handleSubmitCreateProject = () => {
    closeModal();
  };

  const handleSubmitSeeAssignedTask = async () => {
    const projectsResponse = await getDashboardProjectsTasks();
    setProjects(projectsResponse.projects);
    closeModal();
  };

  if (!projects) {
    return <div>Chargement ...</div>;
  }

  return (
    <div className="flex flex-col gap-4 mt-4 pt-10 pr-30 pb-10 pl-30 bg-background">
      <div className="grid grid-cols-2 grid-rows-2">
        <h1 className="col-start-1 row-start-1 text-black-font text-2xl font-semibold font-manrope">
          Tableau de bord
        </h1>
        <p className="col-start-1, row-start-2 text-black-font text-lg font-normal font-inter">
          Bonjour {userName}, voici un aperçu de vos projets et tâches
        </p>
        <BlackButton
          text="+ Créer un projet"
          onClick={() =>
            openModal(
              'Créer un projet',
              <CreateProjectModalContent
                onSubmitSuccess={handleSubmitCreateProject}
              />
            )
          }
        />
        {/* Modale générique */}
        <ModalLayout
          isOpen={modalState.isOpen}
          onClose={closeModal}
          title={modalState.title}
        >
          {renderContent()}
        </ModalLayout>
      </div>
      <ListeKanbanSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'list' && (
        <AffectedTasksList
          projects={projects}
          openModal={openModal}
          handleSubmitSeeAssignedTask={handleSubmitSeeAssignedTask}
        />
      )}
      {activeTab === 'kanban' && (
        <AffectedTasksKanban
          projects={projects}
          openModal={openModal}
          handleSubmitSeeAssignedTask={handleSubmitSeeAssignedTask}
        />
      )}
    </div>
  );
}

export default DashboardClient;
