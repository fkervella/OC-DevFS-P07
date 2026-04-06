import { getInitials } from '@/app/lib/utils';

/**
 * UserAvatar Composant d'affichage de l'avatar d'un utilisateur. Les initiales de l'utilisateur sont affichées dasn l'avatar
 *
 * @param {{ name?: string; bgColor?: string; textColor?: string; left?: number; zIndex?: number; withUserName?: boolean; }} param0
 * @param {string} [param0.name='undefined'] nom de l'utilisateur à afficher
 * @param {string} [param0.bgColor='bg-light-orange'] couleur de fond de l'avatar
 * @param {string} [param0.textColor='text-black-font'] couleur du texte
 * @param {number} [param0.left=0] décalage à gauche de l'avatar et du nom de l'utilisateur
 * @param {number} [param0.zIndex=0] zindex de l'avatar
 * @param {boolean} [param0.withUserName=false] Affichage du nom complet de l'utilisateur en plus des initiales
 * @param {string} [param0.size='small'] Taille d'affichage de l'avatar utilisateur
 * @returns {string} Code HTML d'affichage de l'avatar d'un utilisateur
 */

function UserAvatar({
  name = 'undefined',
  bgColor = 'bg-light-orange',
  textColor = 'text-black-font',
  left = 0,
  zIndex = 0,
  withUserName = false,
  size = 'small',
}) {
  // Correspondance entre la taille passée en paramètre et le style correspondant
  const sizeClasses = {
    small: 'w-7.5 h-7.5',
    normal: 'w-16 w-16',
  };
  const classe = sizeClasses[size];

  return (
    <div className="flex flex-row gap-2">
      <div
        className={`${bgColor} rounded-full ${classe} pt-1 pr-1 pb-1 pl-1 aspect-square flex justify-center items-center relative border border-solid border-white`}
        style={{ left: `-${left}px`, zIndex }}
        aria-label={name}
      >
        <span className={`text-sm font-normal ${textColor}`} aria-hidden="true">
          {getInitials(name)}
        </span>
      </div>
      {withUserName && (
        <div
          className={`${bgColor} rounded-full h-full pt-1 pr-4 pb-1 pl-4 flex justify-center items-center relative border border-solid border-white text-nowrap`}
          style={{ left: `-${left}px`, zIndex }}
        >
          <span className={`text-sm font-normal ${textColor}`}>{name}</span>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
