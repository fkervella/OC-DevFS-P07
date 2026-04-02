import { getUserData, verifySession } from '@/app/lib/dal';

import ProfileClient from './pageClient.jsx';

/**
 * ProfileServer Partie serveur d'afficahge des informations de profil utilisateur
 *
 * @async
 * @returns {ProfileClient} Partie client pour l'afficahge des informations de profil utilisateur
 */

async function ProfileServer() {
  // Vérification que la session active est valable
  const session = await verifySession();

  // Récupération des données de l'utilisateur
  const userData = await getUserData(session.userId);

  if (!userData.success)
    return "Echec de la récupération des données de l'utilisateur";

  return <ProfileClient user={userData} />;
}

export default ProfileServer;
