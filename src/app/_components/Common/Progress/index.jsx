import { calculateProgressPercentage, getActiveTasks } from '@/app/lib/utils';

/**
 * Progress Composant d'afficahge de la progression des tâches d'un projet
 *
 * @param {task[]} tasks liste des tâches du projet
 * @returns {string} Code HTML d'affichage de la progression des tâches d'un projet
 */

function Progress({ tasks }) {
  // Si pas de tâche, pas d'affichage de données
  if (!tasks) return null;

  // Filtrage des tâches actives
  const activeTasks = getActiveTasks(tasks);

  // Calcul du pourcentage d'avancement du projet
  const progress = calculateProgressPercentage(tasks);
  const clampedPercentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="flex flex-col mt-10 mb-10">
      <div className="flex flex-row justify-between">
        <div className="text-grey-font text-normal text-xs">Progression</div>
        <div className="text-black-font text-normal text-xs">{progress}%</div>
      </div>
      <div
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progression du projet"
        className="w-full h-1.25 bg-grey-background rounded-full overflow-hidden mt-2 mb-1"
      >
        <div
          className="h-full bg-orange rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
      <div className="text-grey-font text-normal text-xs">
        {activeTasks.length}/{tasks.length} tâches terminées
      </div>
    </div>
  );
}

export default Progress;
