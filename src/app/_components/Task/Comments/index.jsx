import Comment from '@/app/_components/Task/Comment';

/**
 * Comments Composant d'affichage des commentaires d'une tâche
 *
 * @param {Comment[]} comments Commentaires de la tâche
 * @returns {string} Code HTML d'affichage du nombre de commentaires d'une tâche
 */

function Comments({ comments, isVisibleComment }) {
  if (comments.length === 0) {
    return <div>Pas de commentaire</div>;
  }
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="font-inter font-normal text-sm text-black">
        Commentaires ({comments.length})
      </div>
      {isVisibleComment && (
        <div className="flex flex-col gap-4 flex-wrap">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
