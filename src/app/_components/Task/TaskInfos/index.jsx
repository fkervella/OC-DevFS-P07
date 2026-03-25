import Image from 'next/image';

import { formatDateFR } from '@/app/lib/utils';

/**
 * Composant d'affichage des informations d'une tâche
 *
 * @param {{ className: any; task?: {}; projectName?: string; }} param0
 * @param {string} param0.className TailwindCSS d'affichage de ce composant
 * @param {task} [param0.task=[]] Données de la tâche
 * @param {string} [param0.projectName=''] Nom du projet
 * @returns {string} Code HTML d'affichage des informations d'une tâche
 */

function TaskInfos({ className, task = [], projectName = '' }) {
  return (
    <div className={className}>
      <div className="flex flex-row gap-2">
        <Image
          src="/projectsGreyIcon.png"
          alt="Logo Abricot orange"
          width={18}
          height={14}
          className="self-start h-3.5 w-4.5"
        />
        <div className="font-inter font-normal text-xs text-grey-font">
          {projectName}
        </div>
        <div className="font-inter font-normal text-xs text-grey-font"> | </div>
        <Image
          src="/kanbanGreyIcon.png"
          alt="Logo Abricot orange"
          width={16}
          height={18}
        />
        <div className="font-inter font-normal text-xs text-grey-font">
          {formatDateFR(task.dueDate)}
        </div>
        <div className="font-inter font-normal text-xs text-grey-font"> | </div>
        <Image
          src="/messageGreyIcon.png"
          alt="Logo Abricot orange"
          width={15}
          height={15}
          className="self-start h-3.75 w-3.75"
        />
        <div className="font-inter font-normal text-xs text-grey-font">
          {task?.comments?.length}
        </div>
      </div>
    </div>
  );
}

export default TaskInfos;
