import Image from 'next/image';
import Link from 'next/link';

/**
 * ExpandButton affiche le bouton d'expansion d'informations
 *
 * @param {string} page - page vers laquelle rediriger lorsque le bouton est cliqué
 * @returns {string} Code HTML du boutn à afficher
 */

function ExpandButton({ page }) {
  return (
    <Link
      href={page}
      className="border border-solid border-grey-background bg-white rounded-lg w-14.25 h-14.25 flex justify-center items-center"
    >
      <Image
        src="/tickBlackIcon.png"
        alt="Bouton retour"
        width={16}
        height={16}
        style={{ width: '100%', height: 'auto' }}
      />
    </Link>
  );
}

export default ExpandButton;
