/**
 * BlackButton affiche un bouton d'action noir dont le texte est passé en paramètre
 *
 * @param {string} text - Le texte à afficher sur le bouton
 * @param {"button" | "submit"} type  - le type de bouton
 * @param {Function} onClick - Action lancée au clic sur le bouton
 * @returns {*} Le code HTML du bouton généré
 */

export default function BlackButton({ text = '', type = 'button', onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={text}
      className="bg-black text-white rounded-lg pt-3 pb-3 pr-12 pl-12 font-inter h-fit w-fit cursor-pointer"
      aria-haspopup="dialog"
    >
      {text}
    </button>
  );
}
