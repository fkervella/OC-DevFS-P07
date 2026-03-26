'use client';

import BlackButton from '@/app/_components/Common/BlackButton';
import LabelInput from '@/app/_components/Common/LabelInput';

/**
 * Profile Composant d'afficahge des informations de profil utilisateur
 *
 * @async
 * @returns {string} Code HTML d'afficahge des informations de profil utilisateur
 */

function ProfileClient({ user }) {
  const username = user.name.split(' ');
  const firstname = username[0];
  const lastname = username[1];

  return (
    <div className="flex flex-col gap-4 mt-4 pt-10 pr-30 pb-10 pl-30 bg-background">
      <div className=" bg-white pt-10 pr-20 pb-10 pl-20 rounded-lg">
        <div className="text-manrope font-semibold text-lg text-black">
          Mon compte
        </div>
        <div className="text-inter font-normal text-base text-grey-font">
          {user.name}
        </div>
        <form className="flex flex-col gap-2 w-full">
          <LabelInput
            name="nom"
            text="Nom"
            type="text"
            placeHolder={firstname}
          />
          <LabelInput
            name="prenom"
            text="Prénom"
            type="text"
            placeHolder={lastname}
          />
          <LabelInput
            name="email"
            text="Email"
            type="email"
            placeHolder={user.email}
          />
          <LabelInput
            name="password"
            text="Mot de passe"
            type="password"
            placeHolder="***"
          />
          <BlackButton text="Modifier les informations" />
        </form>
      </div>
    </div>
  );
}

export default ProfileClient;
