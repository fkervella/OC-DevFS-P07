/**
 * DisplayNumber affiche le nombre passé en paramètre au format prévu
 *
 * @param {string} number - Nombre à afficher
 * @returns {string} - Code HTMl du nombre à afficher
 */

function DisplayNumber({ number }) {
  return (
    <div className="text-lg font-semibold font-manrope bg-grey-background text-grey-font rounded-full pr-4 pl-4 h-fit w-fit">
      {number}
    </div>
  );
}

export default DisplayNumber;
