'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  return (
    <div className="bg-white flex flex-col lg:flex-row lg:justify-between gap-2 pt-1 pr-30 pb-1 pl-30 items-center h-18">
      <div className="w-fit">
        <Image
          src="/logoAbricot.png"
          alt="logo"
          width={150}
          height={20}
          loading="eager"
        />
      </div>

      <nav className="flex flex-col lg:flex-row gap-6 items-center">
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

      <div className="h-full">
        <Link href="/profile" className="h-full">
          <UserAvatar
            name={userName}
            bgColor={
              pathname.startsWith('/profile') ? 'bg-orange' : 'bg-light-orange'
            }
            textColor={
              pathname.startsWith('/profile') ? 'text-white' : 'text-black-font'
            }
          />
        </Link>
      </div>
    </div>
  );
}

export default HeaderClient;
