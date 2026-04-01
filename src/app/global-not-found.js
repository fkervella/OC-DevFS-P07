//Import global styles and fonts
//import './globals.css'

import { Inter } from 'next/font/google';
import Link from 'next/link';

/**
 * Description placeholder
 *
 * @type {*}
 */
const inter = Inter({ subsets: ['latin'] });

/**
 * Description placeholder
 *
 * @type {{ title: string; description: string; }}
 */
export const metadata = {
  title: '404 - Page not found',
  description: 'The page you are looking for does not exist.',
};

/**
 * GlobalNotFound fonction d'afficahge de page non trouvée
 *
 * @export
 * @returns {string} Code HTML d'afficahge de la page 404 non trouvée
 */

export default function GlobalNotFound() {
  //TODO mise en forme
  return (
    <html lang="fr" className={inter.className}>
      <body>
        <h1>Erreur 404 : la page demandée n est pas trouvée</h1>
        <Link href="/dashboard">Vous pouvez aller à votre tableau de bord</Link>
      </body>
    </html>
  );
}
