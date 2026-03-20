import Image from 'next/image';
import Link from 'next/link';

import UserAvatar from '@/app/_components/Common/UserAvatar';

function Header() {
  return (
    <div className="bg-white flex flex-col lg:flex-row lg:justify-between gap-2 pt-1 pr-30 pb-1 pl-30 items-center">
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
        <Link href="/dashboard">
          <div className="bg-black rounded-lg flex flex-row pt-4 pr-10 pb-4 pl-10 gap-2 lg:gap-4 justify-center">
            <Image
              src="/dashboardWhiteIcon.png"
              alt="Image tableau de bord"
              width={24}
              height={24}
            />
            <span className="text-white text-base font-normal">
              Tableau de bord
            </span>
          </div>
        </Link>
        <Link href="/projects">
          <div className="bg-white flex flex-row pt-4 pr-10 pb-4 pl-10 gap-4 h-fit justify-center">
            <Image
              src="/projectsOrangeIcon.png"
              alt="Image projets"
              width={24}
              height={24}
            />
            <span className="text-base font-normal text-orange">Projets</span>
          </div>
        </Link>
      </nav>
      <div>
        <Link href="/profile">
          <UserAvatar name="TODO" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
