'use client';

import { useState } from 'react';

import LabelInput from '@/app/_components/Common/LabelInput';
import TaskStatus from '@/app/_components/Task/TaskStatus';

/**
 * ModifyTaskModalContent Composant d'affichage de formulaire de modification d'une tâche sous forme de modale
 *
 * @param {*} onSubmit Fonction exécutée à validation du formulaire
 * @param {*} task Informations de la tâche à modifier
 * @returns {string} Code HTML d'affichage de formulaire de modification d'une tâche sous forme de modale
 */

function ModifyTaskModalContent({ onSubmit, task }) {
  console.log('task: ', task);

  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate
      ? new Date(task.dueDate).toISOString().split('T')[0]
      : '',
    assignedTo: task?.assignees?.[0]?.user?.name || '',
    state: task?.status || 'TODO',
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
          text="Titre"
          name="title"
          type="text"
          placeholder={formData.title}
          value={formData.title}
          onChange={handleChange}
          required
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
          required
        />
      </div>
      <div className="mb-4">
        <LabelInput
          text="Echéance"
          name="dueDate"
          type="date"
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
        <div>Statut :</div>
        <div className="flex flex-row gap-2">
          <TaskStatus status="TODO" />
          <TaskStatus status="IN_PROGRESS" />
          <TaskStatus status="DONE" />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}

export default ModifyTaskModalContent;
