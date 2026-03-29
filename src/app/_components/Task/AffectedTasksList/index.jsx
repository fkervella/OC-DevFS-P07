import { useState } from 'react';

import AffectedTask from '@/app/_components/Task/AffectedTask';
import AffectedTasksListHeader from '@/app/_components/Task/AffectedTasksListHeader';
import { organizeProjectsTasksByPriority } from '@/app/lib/utils';
/**
 * AffectedTaskList Composant d'affichage sous forme de liste des tâches affectées à un utilisateur
 *
 * @param {project[]} param0.projects Liste des projets avec des tâches affectées à un utilisateur
 * @param {Function} param0.openModal Fonction d'affichage de la fenêtre modale
 * @param {Function} param0.handleSubmit Fonction exécutée à la validation de la fenêtre modale
 * @returns {string} Code HTML d'affichage sous forme de liste des tâches affectées à un utilisateur
 */

function AffectedTasksList({
  projects,
  openModal,
  handleSubmitSeeAssignedTask,
}) {
  console.log('projects', projects);
  const [searchText, setSearchText] = useState(null);
  console.log('searchText', searchText);
  const [prioritizedTasks, setPrioritizedTasks] = useState(
    organizeProjectsTasksByPriority({ projects, searchText })
  );
  console.log('prioritizedTasks', prioritizedTasks);

  const handleChangeSearchTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    //filtrage des projets par titre et par description
    console.log('formData : ', formData);
    setSearchText(formData.get('searchText'));
    console.log('searchText', searchText);
    console.log('projects', projects);
    setPrioritizedTasks(
      organizeProjectsTasksByPriority({ projects, searchText })
    );
    console.log('prioritizedTasks', prioritizedTasks);
  };

  return (
    <div className=" bg-white pt-10 pr-10 pb-10 pl-10 rounded-lg flex flex-col gap-4">
      <AffectedTasksListHeader handleChange={handleChangeSearchTask} />
      {prioritizedTasks.map((task) => (
        <AffectedTask
          key={task.id}
          task={task}
          projectName={task.projectName}
          openModal={openModal}
          handleSubmit={handleSubmitSeeAssignedTask}
        />
      ))}
    </div>
  );
}

export default AffectedTasksList;
