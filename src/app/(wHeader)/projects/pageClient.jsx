'use client';

import { useState } from 'react';

import BlackButton from '@/app/_components/Common/BlackButton';
import PageSubtitle from '@/app/_components/Common/PageSubtitle';
import PageTitle from '@/app/_components/Common/PageTitle';
import ModalLayout from '@/app/_components/Modal/ModalLayout';
import CreateProjectModalContent from '@/app/_components/Project/CreateProjectModalContent';
import ProjectCard from '@/app/_components/Project/ProjectCard';
import { getMyProjects } from '@/app/actions/project';
import useModal from '@/hooks/useModal';

/**
 * ProjectsClient partie client pour l'affichage des projets auxquels l'utilisateur participe
 *
 * @param {project[]} param0.projects Liste des projects auxquels l'utilisateur participe
 * @returns {string} Code HTML pour l'affichage des projets auxquels l'utilisateur participe
 */

function ProjectsClient({ projectsProp }) {
  const { modalState, openModal, closeModal } = useModal();

  const [projects, setProjects] = useState(projectsProp);

  const handleSubmit = async () => {
    const newProjects = await getMyProjects();

    if (newProjects.success) setProjects(newProjects.projects);
    closeModal();
  };

  if (!projects) {
    return <div>Chargement ...</div>;
  }

  return (
    <div className="flex flex-col gap-4 mt-4 pt-10 pr-30 pb-10 pl-30 bg-background">
      <div className="flex flex-col lg:flex-row gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <PageTitle title="Mes projets" />
          <PageSubtitle subtitle="Gérez vos projets" />
        </div>
        <BlackButton
          text="+ Créer un projet"
          onClick={() =>
            openModal(
              'Créer un projet',
              <CreateProjectModalContent onSubmitSuccess={handleSubmit} />
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
      <div className="flex flex-row gap-4 flex-wrap">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            tasks={project.tasks}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsClient;
