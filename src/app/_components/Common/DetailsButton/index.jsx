import Image from 'next/image';
import Link from 'next/link';

/**
 * DetailsButton affiche un bouton pour permettant d'afficher la page passée en paramètre
 *
 * @param {string} page - Page vers laquelle rediriger lors du clic sur le bouton
 * @returns {string} - Code HTML du bouton de détails à afficher
 */

function DetailsButton({ page }) {
  return (
    <Link href={page}>
      <div className="border border-solid border-grey-background bg-white rounded-lg w-14.25 h-14.25 flex justify-center items-center">
        <Image
          src="/3DotsGreyIcon.png"
          alt="Bouton retour"
          width={16}
          height={8}
          className="w-auto h-auto"
        />
      </div>
    </Link>
  );
}

export default DetailsButton;
