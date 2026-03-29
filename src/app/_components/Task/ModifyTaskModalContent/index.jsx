'use client';

import { useState, useTransition } from 'react';

import LabelInput from '@/app/_components/Common/LabelInput';
import LabelSelect from '@/app/_components/Common/LabelSelect';
import TaskStatus from '@/app/_components/Task/TaskStatus';
import { updateTask } from '@/app/actions/task';

/**
 * ModifyTaskModalContent Composant d'affichage de formulaire de modification d'une tâche sous forme de modale
 *
 * @param {*} onSubmit Fonction exécutée à validation du formulaire
 * @param {*} task Informations de la tâche à modifier
 * @returns {string} Code HTML d'affichage de formulaire de modification d'une tâche sous forme de modale
 */

function ModifyTaskModalContent({ onSubmit, task }) {
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const initialAssignees = (task?.assignees || []).map((a) => ({
    value: a.user.id,
    label: a.user.name,
    email: a.user.email,
  }));

  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate
      ? new Date(task.dueDate).toISOString().split('T')[0]
      : '',
    members: initialAssignees,
    state: task?.status || 'TODO',
    priority: task?.priority || '',
  });

  const [selectedStatus, setSelectedStatus] = useState(task?.status || 'TODO');
  const statusOptions = ['TODO', 'IN_PROGRESS', 'DONE'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const form = new FormData(e.currentTarget);
        form.append('contributors', JSON.stringify(formData.members));

        const updatedTaskStatus = await updateTask(form);
        if (!updatedTaskStatus.success) setError(updatedTaskStatus.error);
        else {
          onSubmit(formData);
        }
      } catch (error) {
        setError(
          error.message ||
            'Erreur inconnue survenue lors de la mise à jour de de la tâche'
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
      <input name="projectId" type="hidden" value={task.projectId} />
      <input name="taskId" type="hidden" value={task.id} />
      <input name="priority" type="hidden" value={task.priority} />
      <input name="state" type="hidden" value={formData.state} />
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
          disabled={isPending}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          {isPending ? 'Enregistrement ...' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}

export default ModifyTaskModalContent;
