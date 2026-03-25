import AffectedTask from '@/app/_components/Task/AffectedTask';
import AffectedTasksListHeader from '@/app/_components/Task/AffectedTasksListHeader';

/**
 * AffectedTaskList Composant d'affichage sous forme de liste des tâches affectées à un utilisateur
 *
 * @param {{ projects: any; openModal: any; handleSubmit: any; }} param0
 * @param {project[]} param0.projects Liste des projets avec des tâches affectées à un utilisateur
 * @param {Function} param0.openModal Fonction d'affichage de la fenêtre modale
 * @param {Function} param0.handleSubmit Fonction exécutée à la validation de la fenêtre modale
 * @returns {string} Code HTML d'affichage sous forme de liste des tâches affectées à un utilisateur
 */

function AffectedTasksList({ projects, openModal, handleSubmit }) {
  return (
    <div className=" bg-white pt-10 pr-10 pb-10 pl-10 rounded-lg flex flex-col gap-4">
      <AffectedTasksListHeader />

      {projects.map((project) =>
        project.tasks.map((task) => (
          <AffectedTask
            key={task.id}
            task={task}
            projectName={project.name}
            openModal={openModal}
            handleSubmit={handleSubmit}
          />
        ))
      )}
    </div>
  );
}

export default AffectedTasksList;
