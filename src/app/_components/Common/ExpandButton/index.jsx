import Image from 'next/image';

/**
 * ExpandButton affiche le bouton d'expansion d'informations
 *
 * @param {string} handleSubmit - action à réaliser lorsque le bouton est cliqué
 * @param {string} rotation - Angle de rotation de l'image du bouton
 * @returns {string} Code HTML du bouton à afficher
 */

function ExpandButton({ handleSubmit, rotation }) {
  const rotate = rotation ? 'rotate-0' : 'rotate-180';

  return (
    <button
      className={`bg-white w-14.25 justify-center flex ${rotate} cursor-pointer`}
      onClick={handleSubmit}
      aria-label={
        rotation ? 'Masquer les commentaires' : 'Afficher les commentaires'
      }
      aria-expanded={rotation}
    >
      <Image
        src="/tickBlackIcon.png"
        alt="Bouton retour"
        width={17}
        height={10}
        className="self-start h-3 w-auto"
      />
    </button>
  );
}

export default ExpandButton;
