'use client';

import Image from 'next/image';
import { useState } from 'react';
import Select from 'react-select';

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
import {
  getProjectData,
  getProjectTasks,
  synchronizeMembers,
} from '@/app/actions/project';
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

export function ProjectClient({
  projectDataProp,
  projectTasksProp,
  userName,
  isProjectAdministrator,
}) {
  const { modalState, openModal, closeModal } = useModal();
  const [projectData, setProjectData] = useState(projectDataProp);
  const [activeTab, setActiveTab] = useState('list');

  const [allTasks, setAllTasks] = useState(projectTasksProp);
  const [filters, setFilters] = useState({
    text: '',
    status: '',
  });

  const selectOptions = [
    { value: 'NONE', label: 'Tous' },
    { value: 'TODO', label: 'A faire' },
    { value: 'IN_PROGRESS', label: 'En cours' },
    { value: 'DONE', label: 'Terminé' },
  ];

  const filterTasks = (tasks, { text, status }) => {
    let filtered = tasks;

    if (text) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(text.toLowerCase()) ||
          task.description.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (status && status !== 'NONE') {
      filtered = filtered.filter((task) =>
        task.status.toLowerCase().includes(status.toLowerCase())
      );
    }

    return filtered;
  };

  const projectTasks = filterTasks(allTasks, filters);

  const refreshProject = async () => {
    const [project, tasksResponse] = await Promise.all([
      getProjectData(projectData.id),
      getProjectTasks(projectData.id),
    ]);

    setProjectData(project);

    if (tasksResponse.success) {
      setAllTasks(tasksResponse.tasks); // ⚡ filtre conservé automatiquement
    }
  };

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

  const handleSubmitModifyTask = async () => {
    await refreshProject();
    closeModal();
  };

  const handleSubmitNewTask = async () => {
    await refreshProject();
    closeModal();
  };

  const handleStatusChange = (selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      status: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleChangeFilter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setFilters((prev) => ({
      ...prev,
      text: formData.get('searchText') || '',
    }));
  };

  if (!projectData) {
    return <div>Chargement ...</div>;
  }

  return (
    <div className="flex flex-col gap-4 mt-4 pt-10 pr-30 pb-10 pl-30 bg-background">
      <div className="flex flex-col lg:flex-row gap-2 justify-between">
        <LeftArrowButton page="/projects" />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center">
            <PageTitle title={projectData.name} />
            {isProjectAdministrator && (
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
            )}
          </div>
          <PageSubtitle subtitle={projectData.description} />
        </div>
        <BlackButton
          text="Créer une tâche"
          onClick={() =>
            openModal(
              'Créer une tâche',
              <CreateTaskModalContent
                onSubmit={handleSubmitNewTask}
                projectId={projectData.id}
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
          {modalState.content}
        </ModalLayout>
      </div>
      <Contributors members={projectData.members} owner={userName} />
      <div className="flex flex-col gap-4 bg-white pt-10 pr-10 pb-10 pl-10 border border-solid border-grey-background rounded-lg content-center">
        <div className="flex flex-col lg:flex-row gap-2 justify-between items-start lg:items-center">
          <div className="flex flex-col">
            <div className="text-lg text-black-font font-semibold font-manrope ">
              Tâches
            </div>
            <div className="text-base text-grey-font font-normal font-inter ">
              Par ordre de priorité
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-row">
              <ListeCalendarSelector
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            <form
              onChange={handleChangeFilter}
              className="flex flex-col lg:flex-row gap-4"
            >
              <Select
                options={selectOptions}
                placeholder="Statut"
                value={
                  selectOptions.find((opt) => opt.value === filters.status) ||
                  null
                }
                onChange={handleStatusChange}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: '#E5E7EB',
                    borderWidth: '1px',
                    borderRadius: '0.5rem',
                    padding: '0',
                    paddingTop: '3px',
                    paddingRight: '10px',
                    paddingBottom: '3px',
                    paddingLeft: '10px',
                    indicatorSeparator: 'none',
                  }),
                }}
              />
              <div className="pt-2 pr-10 pb-2 pl-10 border-2 border-grey-background rounded-lg items-center flex flex-row gap-2">
                <input
                  name="searchText"
                  placeholder="Rechercher une tâche"
                  className="font-inter"
                />
                <Image
                  src="/search.png"
                  alt="Icône recherche"
                  width={14}
                  height={14}
                />
              </div>
            </form>
          </div>
        </div>
        {activeTab === 'list' && (
          <ProjectTasksList
            tasks={projectTasks}
            openModal={openModal}
            handleSubmitModifyTask={handleSubmitModifyTask}
            username={userName}
            projectId={projectData.id}
          />
        )}
        {activeTab === 'calendar' && (
          <ProjectTasksCalendar tasks={projectTasks} />
        )}
      </div>
    </div>
  );
}

export default ProjectClient;
