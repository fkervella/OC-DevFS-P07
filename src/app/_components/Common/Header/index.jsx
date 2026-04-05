import { redirect } from 'next/navigation';

import { getSession } from '@/app/lib/session';

import HeaderClient from './HeaderClient';

/**
 * Header partie serveur : récupère les informations de l'utilisateur et renvoie le Header partie client
 *
 * @async
 * @returns {HeaderClient}
 */

async function HeaderServer() {
  // Récupération de la session en cours et redirection vers la page de login si aucun utilisateur n'est connecté
  const token = await getSession();
  if (!token) redirect('/login');

  // A partie de la session en cours, obtention du nom de l'utilisateur
  const userName = token ? token.user.name : '';

  return <HeaderClient userName={userName} />;
}

export default HeaderServer;
