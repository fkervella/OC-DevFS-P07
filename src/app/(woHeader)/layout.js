import '@/app/globals.css';

import { Inter, Manrope } from 'next/font/google';

/**
 * Description placeholder
 *
 * @type {*}
 */
const inter = Inter({ subsets: ['latin'] });
/**
 * Description placeholder
 *
 * @type {*}
 */
const manrope = Manrope({ subsets: ['latin'] });

/**
 * RootLayout Layout pour les pages sans header et footer
 *
 * @export
 * @param {*} param0.children Contenu à afficher dans les pages sans header et footer
 * @returns {string} Code HTML des pages sans header et footer
 */

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.className} ${manrope.className}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Abricot, l&apos;application qu&apos;il vous faut</title>
      </head>
      <body className="bg-background">
        <main>{children}</main>
      </body>
    </html>
  );
}
