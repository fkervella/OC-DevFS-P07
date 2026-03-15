//import { verifySession } from '@/app/lib/dal'

async function Dashboard() {
  //const session = await verifySession()

  // Fetch user-specific data from your database or data source
  //const user = await getUserData(session.userId)
  return (
    <div>
      <h1>Welcome, You</h1>
      <p>This is the Dashboard page</p>
    </div>
  );
}

export default Dashboard;
