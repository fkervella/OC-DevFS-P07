/**
 * PageTitle titre de page
 *
 * @param {string} title texte à afficher dans le titre
 * @returns {string} code HTML d'affichage du titre de la page
 */

function PageTitle({ title }) {
  return (
    <h1 className="col-start-1 row-start-1 text-black-font text-2xl font-semibold font-manrope">
      {title}
    </h1>
  );
}

export default PageTitle;
