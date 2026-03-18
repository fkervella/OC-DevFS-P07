'use client';

import { useState } from 'react';

function CreateTaskModalContent({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assignedTo: '',
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
        <label className="block text-sm font-medium mb-1 text-black-font">
          Nom
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded border-grey-background focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="Nom de la tâche"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-black-font">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded border-grey-background focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="Description de la tâche"
          rows="3"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-black-font">
          Personne affectée
        </label>
        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          className="w-full p-2 border rounded border-grey-background focus:outline-none focus:ring-2 focus:ring-orange"
          required
        >
          <option value="">Sélectionnez une personne</option>
          <option value="Membre 1">Membre 1</option>
          <option value="Membre 2">Membre 2</option>
          <option value="Membre 3">Membre 3</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Créer la tâche
        </button>
      </div>
    </form>
  );
}

export default CreateTaskModalContent;
