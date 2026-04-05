'use client';

import { useCallback, useState } from 'react';
import AsyncSelect from 'react-select/async';

import { getUserByName } from '@/app/actions/profile';

/**
 * LabelSelect
 * Un composant de sélection avec recherche asynchrone et sélection multiple.
 * Idéal pour sélectionner des utilisateurs dans une modale.
 *
 * @param {string} text - Le texte du label
 * @param {string} name - Le nom du champ (pour le formulaire parent)
 * @param {Array} options - Options initiales (ex: membres déjà assignés)
 * @param {Function} onChange - Fonction appelée lors du changement de sélection
 * @param {boolean} required - Si le champ est requis
 * @param {string} placeholder - Texte affiché par défaut
 * @returns {string} code HTML contenant l'objet de sélection
 */

export default function LabelSelect({
  text,
  name,
  options = [],
  onChange,
  required = false,
  placeholder = 'Rechercher un utilisateur...',
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour récupérer depuis le backend les utilisateurs correspondant à la saisie
  const loadOptions = useCallback(async (inputValue) => {
    // Recherche non effectuée si inputValue ne contient pas 2 caractères minimum
    if (!inputValue || inputValue.length < 2) return [];

    // Indicateur pour l'utilisateur que la récupération des informations est en cours
    setIsLoading(true);

    try {
      // Récupération des informations du backend
      const usernameResponse = await getUserByName(inputValue);

      // Gestion du retour du backend et affichage d'erreur si nécessaire
      if (!usernameResponse.success) {
        setError(String(usernameResponse.error));
        return [];
      } else {
        setError(null);
      }

      // Renvoi de la liste des utilisateurs trouvés avec id, nom et email
      return usernameResponse.users.map((user) => ({
        value: user.id,
        label: user.name,
        email: user.email,
      }));
    } catch (error) {
      // En cas d'erreur, affichage à l'utilisateur
      setError("Erreur lors de la recherche d'utilisateurs:", error);
      return [];
    } finally {
      // Fin de l'indication à l'utilisateur de l'action en cours
      setIsLoading(false);
    }
  }, []);

  // Gestionnaire de changement pour mettre à jour le formulaire parent
  const handleChange = (selectedOptions) => {
    onChange({
      target: {
        name: name,
        value: selectedOptions,
      },
    });
  };

  // Affectation de la valeur initiale des utilisateurs sélectionnés
  const initialOptions = options || [];

  return (
    <div className="flex flex-col gap-1 w-full">
      {error && (
        <div className="p-4 mb-4 text-red-font bg-light-orange rounded-lg">
          {error}
        </div>
      )}
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {text} {required && <span className="text-red-500">*</span>}
      </label>

      <AsyncSelect
        id={name}
        name={name}
        cacheOptions={true} // Mise en cache des résultats pour éviter de recharger la même recherche
        value={initialOptions} // Affiche les membres déjà assignés au début
        loadOptions={loadOptions}
        onChange={handleChange}
        isMulti={true} // Active la sélection multiple
        isLoading={isLoading}
        placeholder={placeholder}
        noOptionsMessage={({ inputValue }) =>
          inputValue
            ? 'Aucun utilisateur trouvé'
            : 'Commencez à taper pour chercher...'
        }
        loadingMessage={() => 'Recherche en cours...'}
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
            boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : base.boxShadow,
            '&:hover': {
              borderColor: '#3b82f6',
            },
            borderRadius: '0.375rem',
            padding: '0.25rem',
          }),
          menu: (base) => ({
            ...base,
            zIndex: 50,
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: '#f3f4f6',
            borderRadius: '0.25rem',
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: '#374151',
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: '#6b7280',
            ':hover': {
              backgroundColor: '#fee2e2',
              color: '#ef4444',
            },
          }),
        }}
      />
    </div>
  );
}
