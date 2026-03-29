'use client';

import { useState, useTransition } from 'react';

import LabelInput from '@/app/_components/Common/LabelInput';
import LabelSelect from '@/app/_components/Common/LabelSelect';
import { createProject } from '@/app/actions/project';

/**
 * CreateProjectModalContent Composant d'afficahge du contenu de la modale de création de projet
 *
 * @param {Function} onSubmit action à réaliser à la soumission du formulaire
 * @returns {string} Code HTML du formulaire de création de projet
 */

function CreateProjectModalContent({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    members: [],
  });

  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const form = new FormData(e.currentTarget);
        form.append('contributors', JSON.stringify(formData.members));
        const createProjectStatus = await createProject(form);

        if (!createProjectStatus.success) setError(createProjectStatus.error);
        else {
          onSubmitSuccess();
        }
      } catch (error) {
        setError(
          error.message ||
            'Erreur inconnue survenue lors de la création du projet'
        );
      }
    });
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
        <LabelSelect
          text="Contributeurs :"
          name="members"
          type="text"
          placeholder={`${formData.members.length} contributeurs`}
          value={formData.members.length}
          onChange={handleChange}
          required
          defaultValue={formData.members}
          options={formData.members}
        />
      </div>
      {error && (
        <div className="p-4 mb-4 text-red-font bg-light-orange rounded-lg">
          {error}
        </div>
      )}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          disabled={isPending}
        >
          {isPending ? 'Enregistrement ...' : '+ Ajouter un projet'}
        </button>
      </div>
    </form>
  );
}

export default CreateProjectModalContent;
