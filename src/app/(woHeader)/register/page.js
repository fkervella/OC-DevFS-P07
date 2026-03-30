'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import BlackButton from '@/app/_components/Common/BlackButton';
import LabelInput from '@/app/_components/Common/LabelInput';
import { registerUser } from '@/app/actions/profile';

/**
 * Register Page d'enregistrement utilisateur
 *
 * @returns {string} Code HTML d'affichage de la page d'enregistrement utilisateur
 */

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [registerError, setRegisterError] = useState(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const form = new FormData(e.currentTarget);
        const registerStatus = await registerUser(form);

        if (!registerStatus.success) {
          setRegisterError(registerStatus.error);
        } else {
          router.push('/');
        }
      } catch (error) {
        setRegisterError("Erreur lors de l'inscription : ", error.message);
      }
    });
  };

  return (
    <div className="flex flex-row h-screen w-full">
      <div className="w-[40%] flex flex-col items-center justify-between py-30 px-30">
        <Image
          src="/logoAbricot.png"
          alt="Logo Abricot orange"
          width={253}
          height={33}
          className='"self-start'
        />
        <form
          onSubmit={handleRegisterSubmit}
          className="flex flex-col gap-2 w-full max-w-sm items-center"
        >
          <h1 className="text-5xl font-bold text-orange ">Inscription</h1>
          <LabelInput
            name="username"
            text="Nom d'utilisateur"
            type="text"
            value={formData.usernanme}
            onChange={handleChange}
          />
          <LabelInput
            name="email"
            text="Email"
            type="text"
            value={formData.email}
            onChange={handleChange}
          />
          <LabelInput
            name="password"
            text="Mot de passe"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {registerError && (
            <div className="p-4 mb-4 text-red-font bg-light-orange rounded-lg">
              {registerError}
            </div>
          )}
          <BlackButton
            text={isPending ? 'Inscription en cours ...' : "S'inscrire"}
            type="submit
            disabled={isPending}"
          />
        </form>
        <div className="font-inter font-normal text-sm">
          Déjà inscrit ?{' '}
          <Link
            href="/login"
            className="underline text-orange font-inter font-normal text-sm"
          >
            Se connecter
          </Link>
        </div>
      </div>
      <div className="w-[60%] relative h-screen overflow-hidden">
        <Image
          src="/registerPage.png"
          alt="Image page de connexion"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
    </div>
  );
}

export default Register;
