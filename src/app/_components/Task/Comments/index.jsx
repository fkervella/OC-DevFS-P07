/**
 * Comments Composant d'affichage du nombre de commentaires d'une tâche
 *
 * @param {number} param0.number Nombre de commentaires d'une tâche
 * @returns {string} Code HTML d'affichage du nombre de commentaires d'une tâche
 */

function Comments({ number }) {
  return (
    <div className="font-inter font-normal text-sm text-black">
      Commentaires ({number})
    </div>
  );
}

export default Comments;
