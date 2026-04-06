//Import global styles and fonts
import './globals.css';

import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Abricot, l&apos;application qu&apos;il vous faut</title>
      </head>
      <body className="bg-background">
        <main className="h-auto">
          <div className="flex flex-col gap-2">
            <div className="bg-white flex flex-col lg:flex-row lg:justify-between gap-2 pt-1 pr-30 pb-1 pl-30 items-center h-18">
              <div className="w-fit">
                <Link href="/">
                  <Image
                    src="/logoAbricot.png"
                    alt="logo Abricot"
                    width={150}
                    height={20}
                    loading="eager"
                  />
                </Link>
              </div>
            </div>
            <div className="text-center pt-2 pr-2 pb-2 pl-2">
              <h1>Erreur 404 : la page demandée n est pas trouvée</h1>
              <a href="/dashboard">Vous pouvez aller à votre tableau de bord</a>
            </div>
            <div className="bg-white flex flex-col lg:flex-row lg:justify-between gap-2 items-center pt-5 pr-10 pb-5 pl-10">
              <Link href="/">
                <Image
                  src="/logoAbricotNoir.png"
                  alt="Logo Abricot"
                  width={100}
                  height={13}
                />
              </Link>
              <div className="text-base font-normal text-black-font">
                Abricot 2026
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
