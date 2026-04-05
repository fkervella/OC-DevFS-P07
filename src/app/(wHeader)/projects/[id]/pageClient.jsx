'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
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

const selectOptions = [
  { value: 'NONE', label: 'Tous' },
  { value: 'TODO', label: 'A faire' },
  { value: 'IN_PROGRESS', label: 'En cours' },
  { value: 'DONE', label: 'Terminé' },
];

/**
 * ProjectClient Partie client pour l'affichage des données d'un projet
 *
 * @export
 * @param {project} param0.projectDataProp Données du projec
 * @param {task[]} param0.projectTasksProp Liste des tâches du projet
 * @param {string} param0.userName Nom de l'utilisateur connecté
 * @param {boolean} isProjectAdministrator Statut administrateur du projet de l'utilisateur
 * @returns {string} Code HTML d'affichage des données d'un projet
 */

export function ProjectClient({
  projectDataProp,
  projectTasksProp,
  userName,
  isProjectAdministrator,
}) {
  const [error, setError] = useState(null);
  const { modalState, openModal, closeModal } = useModal();
  const [projectData, setProjectData] = useState(projectDataProp);
  const [activeTab, setActiveTab] = useState('list');

  const [allTasks, setAllTasks] = useState(projectTasksProp);
  const [filters, setFilters] = useState({
    text: '',
    status: '',
  });

  // Filtrage de l'affichage des tâches en fonction de la saisie utilisateur
  const projectTasks = useMemo(() => {
    let filtered = allTasks;
    if (filters.text) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(filters.text.toLowerCase()) ||
          task.description.toLowerCase().includes(filters.text.toLowerCase())
      );
    }
    if (filters.status && filters.status !== 'NONE') {
      filtered = filtered.filter((task) =>
        task.status.toLowerCase().includes(filters.status.toLowerCase())
      );
    }
    return filtered;
  }, [allTasks, filters]);

  // Rafraichissement des données du projet
  const refreshProject = async () => {
    setError(null);
    try {
      const [project, tasksResponse] = await Promise.all([
        getProjectData(projectData.id),
        getProjectTasks(projectData.id),
      ]);

      setProjectData((prev) => ({
        ...prev,
        ...project,
      }));

      setAllTasks([...tasksResponse.tasks]); // ⚡ filtre conservé automatiquement
    } catch (err) {
      setError(`${err.message}`);
    }
  };

  // Lors de la modification des données du projet
  const handleSubmit = async (formData) => {
    // Recherche des utilisateurs ajoutés et ceux supprimés
    await synchronizeMembers(
      projectData.id,
      projectData.members,
      formData.members
    );

    const newProjectData = await getProjectData(projectData.id);

    setProjectData(newProjectData);

    closeModal();
  };

  // Retour de la modale de modification de tâche
  const handleSubmitModifyTask = async () => {
    await refreshProject();
    closeModal();
  };

  // Retour de la modale de création de tâche
  const handleSubmitNewTask = async () => {
    await refreshProject();
    closeModal();
  };

  // Action lors du filtrage par statut de tâche
  const handleStatusChange = (selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      status: selectedOption ? selectedOption.value : '',
    }));
  };

  // Action lors du filtrage par nom/description de tâche
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
    <>
      <div
        className="flex flex-col gap-4 mt-4 pt-10 pr-30 pb-10 pl-30 bg-background"
        inert={modalState.isOpen}
      >
        <div className="absolute left-0 pl-10">
          <LeftArrowButton page="/projects" />
        </div>
        <div className="flex flex-col lg:flex-row gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center">
              <PageTitle title={projectData.name} />
              {isProjectAdministrator && (
                <button
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
                  className="underline text-orange font-inter bg-transparent border-none cursor-pointer"
                  aria-haspopup="dialog"
                >
                  Modifier
                </button>
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
        </div>
        {error && (
          <div className="p-4 mb-4 text-red-font bg-light-orange rounded-lg">
            {error}
          </div>
        )}
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
                  key="status-filter"
                  instanceId="status-filter"
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
      {/* Modale générique */}
      <ModalLayout
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
      >
        {modalState.content}
      </ModalLayout>
    </>
  );
}

export default ProjectClient;
