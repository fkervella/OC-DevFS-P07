'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useActionState } from 'react';

import BlackButton from '@/app/_components/Common/BlackButton';
import LabelInput from '@/app/_components/Common/LabelInput';
import { LoginAction } from '@/app/actions/auth.js';

/**
 * Register Page de connexion utilisateur
 *
 * @returns {string} Code HTML d'affichage de la page de connexion utilisateur
 */

function Login() {
  const [state, action, pending] = useActionState(LoginAction, undefined);

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
          action={LoginAction}
          className="flex flex-col gap-2 w-full max-w-sm items-center"
        >
          <h1 className="text-5xl font-bold text-orange font-manrope">
            Connexion
          </h1>
          <LabelInput name="email" text="Email" type="text" />
          {state?.errors?.email && <p>{state.errors.email}</p>}
          {action?.errors}
          {pending?.errors}
          <LabelInput name="password" text="Mot de passe" type="password" />
          <BlackButton text="Se connecter" type="submit" />
          <Link
            href="/forgotPassword"
            className="underline text-orange font-inter font-normal text-sm"
          >
            Mot de passe oublié
          </Link>
        </form>
        <div className="font-inter font-normal text-sm">
          Pas encore de compte ?{' '}
          <Link
            href="/register"
            className="underline text-orange font-inter font-normal text-sm"
          >
            Créer un compte
          </Link>
        </div>
      </div>
      <div className="w-[60%] relative h-screen overflow-hidden">
        <Image
          src="/loginPage.png"
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

export default Login;
