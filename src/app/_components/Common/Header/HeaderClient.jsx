'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import NavButton from '@/app/_components/Common/NavButton';
import UserAvatar from '@/app/_components/Common/UserAvatar';

/**
 * Header partie client renvoie le header du site
 *
 * @param {string} userName - Le nom de l'utilisateur connencté
 * @returns {string}  Code HTML du header
 */

function HeaderClient({ userName }) {
  const pathname = usePathname();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div className="bg-white flex flex-col lg:flex-row justify-between gap-2 pt-1 pr-30 pb-1 pl-30 items-center min-h-18">
      <div className="flex flex-row justify-between items-center w-full">
        {/* barre de menu */}
        <div className="w-fit">
          <Image
            src="/logoAbricot.png"
            alt="logo"
            width={150}
            height={20}
            loading="eager"
          />
        </div>

        {/* Bouton burger */}
        <button
          className="lg:hidden cursor-pointer"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          <div className="flex flex-col gap-1">
            <span className="w-6 h-0.5 bg-black-background"></span>
            <span className="w-6 h-0.5 bg-black-background"></span>
            <span className="w-6 h-0.5 bg-black-background"></span>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={`lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex-col lg:flex-row gap-6 items-center ${isOpenMenu ? 'flex' : 'hidden'} lg:flex lg:mx-auto`}
      >
        <NavButton
          name="Tableau de bord"
          imagePath={
            pathname.startsWith('/dashboard')
              ? '/dashboardWhiteIcon.png'
              : '/dashboardOrangeIcon.png'
          }
          imageAlt="Image tableau de bord"
          isActive={pathname.startsWith('/dashboard')}
          page="/dashboard"
        />
        <NavButton
          name="Projets"
          imagePath={
            pathname.startsWith('/projects')
              ? '/projectsWhiteIcon.png'
              : '/projectsOrangeIcon.png'
          }
          imageAlt="Image projets"
          isActive={pathname.startsWith('/projects')}
          page="/projects"
        />
      </nav>

      <Link
        href="/profile"
        className={`h-auto ${isOpenMenu ? 'flex' : 'hidden'} lg:flex`}
      >
        <UserAvatar
          name={userName}
          bgColor={
            pathname.startsWith('/profile') ? 'bg-orange' : 'bg-light-orange'
          }
          textColor={
            pathname.startsWith('/profile') ? 'text-white' : 'text-black-font'
          }
          size="normal"
        />
      </Link>
    </div>
  );
}

export default HeaderClient;
