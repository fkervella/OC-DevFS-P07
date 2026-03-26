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
    <Link href={page} className="bg-white">
      <Image
        src="/tickBlackIcon.png"
        alt="Bouton retour"
        width={20}
        height={9}
        className="rotate-180"
      />
    </Link>
  );
}

export default ExpandButton;
