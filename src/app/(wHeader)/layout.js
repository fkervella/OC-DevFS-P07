import '@/app/globals.css';

import { Inter, Manrope } from 'next/font/google';

import Footer from '../_components/Common/Footer';
import Header from '../_components/Common/Header';

/**
 * Inter définition d'une font disponible
 *
 * @type {*}
 */
const inter = Inter({ subsets: ['latin'] });
/**
 * Manrope définition d'une font disponible
 *
 * @type {*}
 */
const manrope = Manrope({ subsets: ['latin'] });

/**
 * RootLayout Layout pour les pages avec header et footer
 *
 * @export
 * @param {*} param0.children Contenu à afficher dans les pages avec header et footer
 * @returns {string} Code HTML des pages avec header et footer
 */

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.className} ${manrope.className}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Abricot, l&apos;application qu&apos;il vous faut</title>
      </head>
      <body className="bg-background">
        <Header />
        <main className="h-auto">{children}</main>
        <Footer />
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
