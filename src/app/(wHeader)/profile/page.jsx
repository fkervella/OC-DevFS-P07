import { getUserProfile } from '@/app/actions/profile';

import ProfileClient from './pageClient.jsx';

/**
 * ProfileServer Partie serveur d'afficahge des informations de profil utilisateur
 *
 * @async
 * @returns {ProfileClient} Partie client pour l'afficahge des informations de profil utilisateur
 */

async function ProfileServer() {
  const { user } = await getUserProfile();

  return <ProfileClient user={user} />;
}

export default ProfileServer;
