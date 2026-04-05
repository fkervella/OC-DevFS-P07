/**
 * CardTitle affiche le titre de la carte au format prévu
 *
 * @param {string} title - Titre à afficher
 * @returns {string} - code HTML du titre de la carte
 */

function CardTitle({ title }) {
  return (
    <div className="font-manrope text-lg font-semibold text-black col-start-1 row-start-1">
      {title}
    </div>
  );
}

export default CardTitle;
