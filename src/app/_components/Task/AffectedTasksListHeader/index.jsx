import Image from 'next/image';

/**
 * AffectedTasksListHeader Composant d'affichage du header des tâches affectées à un utilisateur affichées sous forme de liste
 *
 * @returns {string} Code HTML d'affichage du header des tâches affectées à un utilisateur affichées sous forme de liste
 */

function AffectedTasksListHeader({ handleChange }) {
  return (
    <div className="flex flex-col lg:flex-row gap-2 justify-between">
      <div className="flex flex-col gap-2">
        <div className="text-lg text-black-font font-semibold font-manrope">
          Mes tâches assignées
        </div>
        <div className="text-base text-grey-font font-normal font-inter">
          Par ordre de priorité
        </div>
      </div>
      <form
        onChange={handleChange}
        className="pt-2 pr-10 pb-2 pl-10 border-2 border-grey-background rounded-lg flex flex-row gap-2 items-center"
      >
        <input
          name="searchText"
          placeholder="Rechercher une tâche"
          className="font-inter w-full"
        ></input>
        <Image src="/search.png" alt="Icône recherche" width={14} height={14} />
      </form>
    </div>
  );
}

export default AffectedTasksListHeader;
