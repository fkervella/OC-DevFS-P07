'use client';
import '@/app/globals.css';

import Image from 'next/image';
import Link from 'next/link';

/**
 * Error renvoie le statut de l'erreur
 *
 * @param {string} statusCode code de statut de l'erreur
 * @returns Informations complémentaires sur le statut de l'erreur
 */

function Error({ error }) {
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
                    aria-label="Retour à l'accueil"
                  />
                </Link>
              </div>
            </div>
            <p className="text-center pt-2 pr-2 pb-2 pl-2" role="alert">
              <h1>Une erreur est survenue</h1>
              {error
                ? `An error ${error} occurred on server`
                : 'An error occurred on client'}
            </p>
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

export default Error;
