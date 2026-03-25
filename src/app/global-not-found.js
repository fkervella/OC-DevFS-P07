//Import global styles and fonts
//import './globals.css'

import { Inter } from 'next/font/google';

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
  //TODO
  return (
    <html lang="fr" className={inter.className}>
      <body>
        <h1>404 - page not found</h1>
        <p>This page does not exist.</p>
      </body>
    </html>
  );
}
