'use client';

import { useState, useTransition } from 'react';

import LabelInput from '@/app/_components/Common/LabelInput';
import LabelSelect from '@/app/_components/Common/LabelSelect';
import { createTask } from '@/app/actions/task';

/**
 * CreateTaskModalContent Composant d'affichage du formulaire de création d'une tâche dans une fenêtre modale
 *
 * @param {Function} param0.onSubmit fonction exécutée à la validation du formulaire
 * @returns {string} Code HTML d'affichage du formulaire de création d'une tâche dans une fenêtre modale
 */

function CreateTaskModalContent({ onSubmit, projectId }) {
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    members: [],
    state: '',
    contributors: '',
    priority: 'LOW',
  });

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

        const createTaskStatus = await createTask(form);
        if (!createTaskStatus.success) setError(createTaskStatus.error);
        else {
          onSubmit(formData);
        }
      } catch (error) {
        setError(
          error.message ||
            'Erreur inconnue survenue lors de la création de la tâche'
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="projectId" type="hidden" value={projectId} />
      <input
        name="priority"
        type="hidden"
        value={formData.priority}
        onChange={handleChange}
      />
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
          type="date"
          placeholder=""
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <LabelSelect
          text="Assigné à :"
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
      <div className="mb-4">
        <div>Statut</div>
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
          {isPending ? 'Enregistrement ...' : '+ Ajouter une tâche'}
        </button>
      </div>
    </form>
  );
}

export default CreateTaskModalContent;
