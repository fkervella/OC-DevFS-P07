/**
 * PageSubtitle sous-titre de page
 *
 * @param {string} subtitle texte de sous-titre à afficher
 * @returns {string} code HTML d'affichage du sosu-titre
 */

function PageSubtitle({ subtitle }) {
  return (
    <p className="col-start-1, row-start-2 text-black-font text-lg font-normal font-inter">
      {subtitle}
    </p>
  );
}

export default PageSubtitle;
