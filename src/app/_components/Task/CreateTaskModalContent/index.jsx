'use client';

import { useState, useTransition } from 'react';

import LabelInput from '@/app/_components/Common/LabelInput';
import LabelSelect from '@/app/_components/Common/LabelSelect';
import TaskStatus from '@/app/_components/Task/TaskStatus';
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
    projectId: projectId,
    title: '',
    description: '',
    dueDate: '',
    members: [],
    state: '',
    contributors: '',
    priority: 'LOW',
  });

  const [selectedStatus, setSelectedStatus] = useState('TODO');
  const statusOptions = ['TODO', 'IN_PROGRESS', 'DONE'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const form = new FormData();
        form.append('projectId', projectId);
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('dueDate', formData.dueDate);
        form.append('priority', formData.priority);
        form.append('state', formData.state);
        form.append('contributors', JSON.stringify(formData.members));

        const createTaskStatus = await createTask(form);
        if (!createTaskStatus.success) setError(createTaskStatus.error);
        else {
          await onSubmit(formData);
        }
      } catch (error) {
        setError(
          error.message ||
            'Erreur inconnue survenue lors de la création de la tâche'
        );
      }
    });
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({
      ...prev,
      state: status,
    }));
    setSelectedStatus(status);
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
        <div>Statut :</div>
        <div className="flex flex-row gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => handleStatusChange(status)}
            >
              <TaskStatus
                status={status}
                selected={selectedStatus === status ? true : false}
              />
            </button>
          ))}
        </div>
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
