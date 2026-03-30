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

export function ProjectClient({ projectDataProp, projectTasksProp, userName }) {
  const { modalState, openModal, closeModal } = useModal();
  const [projectData, setProjectData] = useState(projectDataProp);
  const [activeTab, setActiveTab] = useState('list');

  const [allTasks, setAllTasks] = useState(projectTasksProp);
  const [filters, setFilters] = useState({
    text: '',
    status: '',
  });

  const filterTasks = (tasks, { text, status }) => {
    let filtered = tasks;

    if (text) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(text.toLowerCase()) ||
          task.description.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (status) {
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

  const handleChangeFilter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setFilters({
      text: formData.get('searchText') || '',
      status: formData.get('taskStatus') || '',
    });
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
            <form
              onChange={handleChangeFilter}
              className="col-start-2 row-start-1 row-end-3"
            >
              <select type="select" name="taskStatus">
                <option value="TODO">A faire</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="DONE">Terminé</option>
              </select>
              <input
                name="searchText"
                placeholder="Rechercher une tâche"
              ></input>
            </form>
          </div>
        </div>
        {activeTab === 'list' && (
          <ProjectTasksList
            tasks={projectTasks}
            openModal={openModal}
            handleSubmitModifyTask={handleSubmitModifyTask}
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
