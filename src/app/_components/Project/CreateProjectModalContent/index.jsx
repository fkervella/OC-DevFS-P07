'use client';

import { useState } from 'react';

import LabelInput from '@/app/_components/Common/LabelInput';

/**
 * CreateProjectModalContent Composant d'afficahge du contenu de la modale de création de projet
 *
 * @param {Function} onSubmit action à réaliser à la soumission du formulaire
 * @returns {string} Code HTML du formulaire de création de projet
 */

function CreateProjectModalContent({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    state: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <LabelInput
          text="Titre*"
          name="title"
          type="text"
          placeholder=""
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <LabelInput
          text="Description*"
          name="description"
          type="text"
          placeholder=""
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <LabelInput
          text="Contributeurs :"
          name="assignedTo"
          type="text"
          placeholder=""
          value={formData.assignedTo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          + Ajouter un projet
        </button>
      </div>
    </form>
  );
}

export default CreateProjectModalContent;
