'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import BlackButton from '@/app/_components/Common/BlackButton';
import LabelInput from '@/app/_components/Common/LabelInput';
import { updateProfile } from '@/app/actions/profile.js';
/**
 * Profile Composant d'afficahge des informations de profil utilisateur
 *
 * @async
 * @returns {string} Code HTML d'afficahge des informations de profil utilisateur
 */

function ProfileClient({ user }) {
  const [firstname, lastname] = user.name.split(' ');
  const [formData, setFormData] = useState({
    firstname,
    lastname,
    email: user.email,
    currentPassword: '',
    newPassword: '',
  });

  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const form = new FormData(e.currentTarget);
        const updateStatus = await updateProfile(form);

        if (!updateStatus.success) setError(updateStatus.error);
        else setError(null);

        router.refresh();
      } catch (error) {
        setError('Erreur lors de la soumission : ', error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 mt-4 pt-10 pr-30 pb-10 pl-30 bg-background">
      <div className=" bg-white pt-10 pr-20 pb-10 pl-20 rounded-lg">
        <div className="text-manrope font-semibold text-lg text-black">
          Mon compte
        </div>
        <div className="text-inter font-normal text-base text-grey-font">
          {user.name}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <LabelInput
            name="lastname"
            text="Nom"
            type="text"
            value={formData.lastname}
            onChange={handleChange}
          />
          <LabelInput
            name="firstname"
            text="Prénom"
            type="text"
            value={formData.firstname}
            onChange={handleChange}
          />
          <LabelInput
            name="email"
            text="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <LabelInput
            name="currentPassword"
            text="Mot de passe actuel"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <LabelInput
            name="newPassword"
            text="Nouveau mot de passe"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <BlackButton
            text={
              isPending ? 'Enregistrement ...' : 'Modifier les informations'
            }
            type="submit"
            disabled="isPending"
          />
          {error && (
            <div className="p-4 mb-4 text-red-font bg-light-orange rounded-lg">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfileClient;
