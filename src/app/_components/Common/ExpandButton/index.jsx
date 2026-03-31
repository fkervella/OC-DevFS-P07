import Image from 'next/image';

/**
 * ExpandButton affiche le bouton d'expansion d'informations
 *
 * @param {string} page - page vers laquelle rediriger lorsque le bouton est cliqué
 * @returns {string} Code HTML du boutn à afficher
 */

function ExpandButton({ handleSubmit, rotation }) {
  const rotate = rotation ? 'rotate-0' : 'rotate-180';

  return (
    <button
      className={`bg-white w-14.25 justify-center flex ${rotate}`}
      onClick={handleSubmit}
    >
      <Image
        src="/tickBlackIcon.png"
        alt="Bouton retour"
        width={20}
        height={9}
        className="rotate-180"
      />
    </button>
  );
}

export default ExpandButton;
