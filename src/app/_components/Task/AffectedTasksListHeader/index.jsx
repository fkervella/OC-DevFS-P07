/**
 * AffectedTasksListHeader Composant d'affichage du header des tâches affectées à un utilisateur affichées sous forme de liste
 *
 * @returns {string} Code HTML d'affichage du header des tâches affectées à un utilisateur affichées sous forme de liste
 */

function AffectedTasksListHeader() {
  return (
    <div className="grid grid-cols-2 grid-rows-3">
      <div className="text-lg text-black-font font-semibold font-manrope col-start-1 row-start-1">
        Mes tâches assignées
      </div>
      <div className="text-base text-grey-font font-normal font-inter col-start-1 row-start-2">
        Par ordre de priorité TODO
      </div>
      <form className="col-start-2 row-start-1 row-end-3">
        <input placeholder="Rechercher une tâche TODO"></input>
      </form>
    </div>
  );
}

export default AffectedTasksListHeader;
