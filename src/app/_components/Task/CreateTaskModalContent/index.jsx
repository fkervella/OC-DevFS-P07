'use client';

import { useState } from 'react';

import LabelInput from '@/app/_components/Common/LabelInput';

/**
 * CreateTaskModalContent Composant d'affichage du formulaire de création d'une tâche dans une fenêtre modale
 *
 * @param {Function} param0.onSubmit fonction exécutée à la validation du formulaire
 * @returns {string} Code HTML d'affichage du formulaire de création d'une tâche dans une fenêtre modale
 */

function CreateTaskModalContent({ onSubmit }) {
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
          text="Echéance*"
          name="dueDate"
          type="text"
          placeholder=""
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <LabelInput
          text="Assigné à :"
          name="assignedTo"
          type="text"
          placeholder=""
          value={formData.assignedTo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <div>Statut</div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          + Ajouter une tâche
        </button>
      </div>
    </form>
  );
}

export default CreateTaskModalContent;
