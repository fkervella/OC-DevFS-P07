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
 * @param {string} placeholder - Texte d'invite
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

  // Fonction pour charger les options depuis l'API
  const loadOptions = useCallback(async (inputValue) => {
    if (!inputValue || inputValue.length < 2) {
      // On ne cherche pas si moins de 2 caractères (optionnel, mais recommandé)
      return [];
    }

    setIsLoading(true);

    try {
      const usernameResponse = await getUserByName(inputValue);

      if (!usernameResponse.success) {
        setError(String(usernameResponse.error));
        return [];
      } else {
        setError(null);
      }

      return usernameResponse.users.map((user) => ({
        value: user.id,
        label: user.name,
        email: user.email,
      }));
    } catch (error) {
      console.error("Erreur lors de la recherche d'utilisateurs:", error);
      return [];
    } finally {
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

  // Formatage des options initiales (celles venant du projet existant)
  // Elles doivent avoir la même structure { value, label }
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
        cacheOptions={true} // Cache les résultats pour éviter de recharger la même recherche
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
        // Styles personnalisés pour s'intégrer au design Tailwind
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? '#3b82f6' : '#d1d5db', // blue-500 ou gray-300
            boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : base.boxShadow,
            '&:hover': {
              borderColor: '#3b82f6',
            },
            borderRadius: '0.375rem', // rounded-md
            padding: '0.25rem',
          }),
          menu: (base) => ({
            ...base,
            zIndex: 50, // Important pour les modales
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: '#f3f4f6', // gray-100
            borderRadius: '0.25rem',
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: '#374151', // gray-700
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: '#6b7280',
            ':hover': {
              backgroundColor: '#fee2e2', // red-100
              color: '#ef4444', // red-500
            },
          }),
        }}
      />
    </div>
  );
}
