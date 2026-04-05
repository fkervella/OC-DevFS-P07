import { useState, useTransition } from 'react';

import UserAvatar from '@/app/_components/Common/UserAvatar';
import Comment from '@/app/_components/Task/Comment';
import { addComment } from '@/app/actions/task';

/**
 * Comments Composant d'affichage des commentaires d'une tâche
 *
 * @param {Comment[]} comments Commentaires de la tâche
 * @param {boolean} isVisibleComment visibilité du commentaire
 * @param {string} username Nom de l'utilisateur connecté
 * @param {string} projectId Identifiant du projet
 * @param {string} taskId Identifiant de la tâche
 * @param {Function} refreshData Fonction pour rafraichir les données de la page
 * @returns {string} Code HTML d'affichage du nombre de commentaires d'une tâche
 */

function Comments({
  comments,
  isVisibleComment,
  username,
  projectId,
  taskId,
  refreshData,
}) {
  const [formData, setFormData] = useState({
    comment: '',
    projectId: projectId,
    taskId: taskId,
  });
  const [addCommentError, setAddCommentError] = useState(null);
  const [, startTransition] = useTransition();

  // Si pas de commentaire, affichage de l'information
  if (comments.length === 0) {
    return <div>Pas de commentaire</div>;
  }

  // Conservation de la saisie d'un nouveau commentaire
  const handleChangeNewComment = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation d'un nouveau commentaire
  const handleSubmitNewComment = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const form = new FormData(e.currentTarget);
        //Enregistrement dans le backend
        const addCommentStatus = await addComment(form);

        // Si nécessaire, affichage de l'erreur à l'utilisateur
        if (!addCommentStatus.success) {
          setAddCommentError(addCommentStatus.error);
        }

        // Effacement du formulaire pour saisir un nouveau commentaire si besoin
        setFormData((prev) => ({
          ...prev,
          ['comment']: '',
        }));

        //Rafraichissement des données de la page
        refreshData();
      } catch (error) {
        setAddCommentError("Erreur lors de l'inscription : ", error.message);
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 min-w-0 flex-1">
      <div className="font-inter font-normal text-sm text-black">
        Commentaires ({comments.length})
      </div>
      {isVisibleComment && (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <div className="flex flex-row gap-2 w-full">
            <UserAvatar
              name={username}
              bgColor="bg-grey-background"
              withUserName={false}
              size="small"
            />
            <div className="flex flex-col gap-2 pt-3 pr-3 pb-3 pl-3 rounded-lg bg-grey2-background w-full">
              <form onSubmit={handleSubmitNewComment}>
                <input
                  type="hidden"
                  name="projectId"
                  value={formData.projectId}
                />
                <input type="hidden" name="taskId" value={formData.taskId} />
                <input
                  name="comment"
                  placeholder="Ajouter un commentaire..."
                  className="font-inter w-full"
                  onChange={handleChangeNewComment}
                  value={formData.comment}
                />
              </form>
              {addCommentError && (
                <div className="p-4 mb-4 text-red-font bg-light-orange rounded-lg">
                  {addCommentError}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
