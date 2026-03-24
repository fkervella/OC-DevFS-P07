import { getDashboardProjectsTasks } from '@/app/actions/dashboard';
import { getSession } from '@/app/lib/session';

import DashboardClient from './pageClient';

async function DashboardServer() {
  //const session = await verifySession()

  // Fetch user-specific data from your database or data source
  //const user = await getUserData(session.userId)

  const { projects } = await getDashboardProjectsTasks();

  const token = await getSession();

  const userName = token ? token.user.name : '';

  return <DashboardClient projects={projects} userName={userName} />;
}

export default DashboardServer;
