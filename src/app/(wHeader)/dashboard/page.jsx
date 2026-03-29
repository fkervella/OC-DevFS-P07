import { getDashboardProjectsTasks } from '@/app/actions/dashboard';
import { getUserData, verifySession } from '@/app/lib/dal';

import DashboardClient from './pageClient';

/**
 * DashboardServer Partie serveur pour l'affichage du tableau de bord utilisateur
 *
 * @async
 * @returns {DashboardClient} Partie client pour l'affichage du tableau de bord utilisateur
 */

async function DashboardServer() {
  // Vérification que la session active est valable
  const session = await verifySession();

  // Récupération des données de l'utilisateur
  const userData = await getUserData(session.userId);

  // Récupération des données à afficher dans le tableau de cord de l'utilisateur
  const projectsResponse = await getDashboardProjectsTasks();

  // TODO gestion d'une valeur renoyée incorrecte
  const { projects } = projectsResponse;

  return <DashboardClient projectsProp={projects} userName={userData.name} />;
}

export default DashboardServer;
