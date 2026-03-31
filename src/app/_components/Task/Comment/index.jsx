import UserAvatar from '@/app/_components/Common/UserAvatar';
import { formatDateFR } from '@/app/lib/utils';

function Comment({ comment }) {
  if (!comment) return null;

  const authorId = comment.author?.id || 'Id inconnu';
  const authorName = comment.author?.name || 'Utilisateur inconnu';
  const content = comment.content || 'Commentaire indéterminé';
  const commentDate = formatDateFR(comment.createdAt) || 'Date indéterminée';

  return (
    <div className="flex flex-row gap-2 w-full">
      <UserAvatar
        key={authorId}
        name={authorName}
        bgColor="bg-grey-background"
        withUserName={false}
      />
      <div className="flex flex-row gap-4 justify-between pt-3 pr-3 pb-3 pl-3 rounded-lg bg-grey2-background w-full">
        <div className="flex flex-col gap-2">
          <div className="font-inter font-normal text-sm">{authorName}</div>
          <div className="font-inter font-normal text-xs">{content}</div>
        </div>
        <div className="font-inter font-normal text-xs text-grey-font">
          {commentDate}
        </div>
      </div>
    </div>
  );
}

export default Comment;
