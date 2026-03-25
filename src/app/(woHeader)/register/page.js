'use client';

import Image from 'next/image';
import Link from 'next/link';

import BlackButton from '@/app/_components/Common/BlackButton';
import LabelInput from '@/app/_components/Common/LabelInput';

/**
 * Register Page d'enregistrement utilisateur
 *
 * @returns {string} Code HTML d'affichage de la page d'enregistrement utilisateur
 */

function Register() {
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
        <form className="flex flex-col gap-2 w-full max-w-sm items-center">
          <h1 className="text-5xl font-bold text-orange ">Inscription</h1>
          <LabelInput name="email" text="Email" type="text" />
          <LabelInput name="password" text="Mot de passe" type="password" />
          <BlackButton text="S'inscrire" type="submit" />
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
