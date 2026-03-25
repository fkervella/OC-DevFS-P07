import { getSession } from '@/app/lib/session';

import HeaderClient from './HeaderClient';

/**
 * Header partie serveur : récupère les informations de l'utilisateur et renvoie le Header partie client
 *
 * @async
 * @returns {HeaderClient}
 */

async function HeaderServer() {
  const token = await getSession();

  const userName = token ? token.user.name : '';

  return <HeaderClient userName={userName} />;
}

export default HeaderServer;
