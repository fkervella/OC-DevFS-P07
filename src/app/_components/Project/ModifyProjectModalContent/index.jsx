'use client';

import { useState, useTransition } from 'react';

import LabelInput from '@/app/_components/Common/LabelInput';
import LabelSelect from '@/app/_components/Common/LabelSelect';
import { updateProject } from '@/app/actions/project';

/**
 * CreateProjectModalContent Composant d'afficahge du contenu de la modale de création de projet
 *
 * @param {Function} onSubmit action à réaliser à la soumission du formulaire
 * @returns {string} Code HTML du formulaire de création de projet
 */

function ModifyProjectModalContent({ onSubmit, project }) {
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const initialMembers = (project?.members || []).map((m) => ({
    value: m.user.id,
    label: m.user.name,
    email: m.user.email,
  }));

  const [formData, setFormData] = useState({
    id: project?.id || '',
    title: project?.name || '',
    description: project?.description || '',
    members: initialMembers,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const form = new FormData(e.currentTarget);
        const updateStatus = await updateProject(form);

        if (!updateStatus.success) setError(updateStatus.error);
        else setError(null);
      } catch (error) {
        setError('Erreur lors de la modification : ', error.message);
      }
    });
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="projectId"
        id="projectId"
        type="hidden"
        value={formData.id}
      ></input>
      <div className="mb-4">
        <LabelInput
          text="Titre"
          name="title"
          type="text"
          placeholder=""
          value={formData.title}
          onChange={handleChange}
          required
          autoFocus
        />
      </div>
      <div className="mb-4">
        <LabelInput
          text="Description"
          name="description"
          type="text"
          placeholder=""
          value={formData.description}
          onChange={handleChange}
          className="text-wrap h-fit"
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
      <div className="flex justify-end">
        <button
          text={isPending ? 'Enregistrement ...' : 'Modifier'}
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Modifier
        </button>
        {error && (
          <div className="p-4 mb-4 text-red-font bg-light-orange rounded-lg">
            {error}
          </div>
        )}
      </div>
    </form>
  );
}

export default ModifyProjectModalContent;
