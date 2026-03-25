import BlackButton from '@/app/_components/Common/BlackButton';
import CardDescription from '@/app/_components/Common/CardDescription';
import CardTitle from '@/app/_components/Common/CardTitle';
import ModifyTaskModalContent from '@/app/_components/Task/ModifyTaskModalContent';
import TaskInfos from '@/app/_components/Task/TaskInfos';
import TaskStatus from '@/app/_components/Task/TaskStatus';

/**
 * AffectedTask Composant d'affichage des données d'une tâche affectée à un utilisateur
 *
 * @param {{ task?: {}; projectName?: string; openModal: any; handleSubmit: any; }} param0
 * @param {task} [param0.task=[]] Données de la tâche affectée à l'utilisateur
 * @param {string} [param0.projectName=''] Nom du projet
 * @param {Function} param0.openModal fonction d'afficahge de la fenêtre modale
 * @param {Function} param0.handleSubmit fonction à exécuter lors de la validation de la fenêtre modale
 * @returns {string} Code HTML d'affichage des données d'une tâche affectée à un utilisateur
 */

function AffectedTask({
  task = [],
  projectName = '',
  openModal,
  handleSubmit,
}) {
  return (
    <div className="border border-solid border-grey-background flex flex-col rounded-lg pt-8 pr-10 pb-8 pl-10">
      <div className="grid grid-cols-2 grid-rows-2">
        <CardTitle title={task.title} />
        <TaskStatus status={task.status} />
        <CardDescription description={task.description} />
      </div>
      <div className="flex flex-row lg:flex-col justify-start lg:justify-between content-normal">
        <TaskInfos task={task} projectName={projectName} />
        <BlackButton
          text="Voir"
          onClick={() =>
            openModal(
              'Modifier une tâche',
              <ModifyTaskModalContent onSubmit={handleSubmit} />
            )
          }
        />
      </div>
    </div>
  );
}

export default AffectedTask;
