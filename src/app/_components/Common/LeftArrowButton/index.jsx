import Image from 'next/image';
import Link from 'next/link';

/**
 * LeftArrowButton bouton pour aller vers une autre page, affiché sous forme de flèche à gauche
 *
 * @param {string} page page vers laquelle rediriger lors de l'appui sur le bouton
 * @returns {string} code HTML du bouton
 */

function LeftArrowButton({ page }) {
  return (
    <Link href={page}>
      <div className="border border-solid border-grey-background bg-white rounded-lg w-14.25 h-14.25 flex justify-center items-center">
        <Image
          src="/leftArrowBlackIcon.png"
          alt="Bouton retour"
          width={16}
          height={8}
        />
      </div>
    </Link>
  );
}

export default LeftArrowButton;
