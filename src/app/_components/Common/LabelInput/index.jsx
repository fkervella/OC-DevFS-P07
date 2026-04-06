/**
 * LabelInput composant renvoyant un objet Label et l'input associé pour les formulaires
 *
 * @export
 * @param {string} name - Nom de l'objet
 * @param {string} text - Texte à afficher dans le label
 * @param {string} type - Type de l'objet input
 * @param {string} placeHolder Placeholder de l'objet input
 * @param {string} value Valeur initiale de l'objet input
 * @param {string} defaultValue Valeur par défaut de l'objet input
 * @param {Function} onChange Fonction appelée lors du changement de valeur de l'objet input
 * @param {boolean} autoFocus Fixe le focus sur cet objet input
 * @param {boolean} required Champ requis
 * @returns {string} code HTML contenant le label et l'input concernés
 */

export default function LabelInput({
  name,
  text,
  type,
  placeHolder,
  value,
  defaultValue,
  onChange,
  autoFocus,
  required,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="black font-normal mt-4 text-sm text-black-font font-inter"
      >
        {text}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeHolder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        autoFocus={autoFocus}
        required={required}
        aria-required={required}
        className="rounded-lg pt-2 pr-2 pb-2 pl-2 border border-gray-200 bg-white font-inter font-normal text-grey-font"
      ></input>
    </div>
  );
}
