//import { verifySession } from '@/app/lib/dal'
import ListeKanbanSelector from '@/app/_components/Project/ListeKanbanSelector';
import AffectedTasksKanban from '@/app/_components/Task/AffectedTasksKanban';
import AffectedTasksList from '@/app/_components/Task/AffectedTasksList';
import { getDashboardAssignedTasks } from '@/app/actions/dashboard';

async function Dashboard() {
  //const session = await verifySession()

  // Fetch user-specific data from your database or data source
  //const user = await getUserData(session.userId)

  const { tasksid } = await getDashboardAssignedTasks();

  return (
    <div className="flex flex-col gap-4 mt-4 pt-10 pr-30 pb-10 pl-30 bg-background">
      <div className="grid grid-cols-2 grid-rows-2">
        <h1 className="col-start-1 row-start-1 text-black-font text-2xl font-semibold font-manrope">
          Tableau de bord
        </h1>
        <p className="col-start-1, row-start-2 text-black-font text-lg font-normal font-inter">
          Bonjour TODO, voici un aperçu de vos projets et tâches
        </p>
        <div className="col-start-2 row-start-1 row-end-3 h-12.5 bg-black rounded-lg flex flex-row pt-3 pr-8 pb-3 pl-8 gap-2 lg:gap-4 w-fit justify-center text-white text-base font-normal">
          + Créer un projet
        </div>
      </div>
      <ListeKanbanSelector />
      <AffectedTasksList tasks={tasksid} />
      <AffectedTasksKanban tasks={tasksid} />
    </div>
  );
}

export default Dashboard;
