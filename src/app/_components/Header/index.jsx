import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <div className="bg-white flex flex-col lg:flex-row lg:justify-between gap-2 pt-1 pr-30 pb-1 pl-30 items-center">
      <div className="">
        <Image
          className="logo"
          src="/logoAbricot.png"
          alt="logo"
          width={150}
          height={20}
        />
      </div>
      <nav className="flex flex-col lg:flex-row gap-6 items-center">
        <Link href="/dashboard" className="">
          <div className="bg-black rounded-lg flex flex-row pt-4 pr-10 pb-4 pl-10 gap-2 lg:gap-4 w-fit justify-center">
            <Image
              src="/dashboardWhiteIcon.png"
              alt="Image tableau de bord"
              width={24}
              height={24}
              className=""
            />
            <span className="text-white text-base font-normal">
              Tableau de bord
            </span>
          </div>
        </Link>
        <Link href="/projects" className="">
          <div className="bg-white flex flex-row pt-4 pr-10 pb-4 pl-10 gap-4 w-fit justify-center">
            <Image
              src="/projectsOrangeIcon.png"
              alt="Image projets"
              width={24}
              height={24}
              className=""
            />
            <span className="text-base font-normal text-orange">Projets</span>
          </div>
        </Link>
      </nav>
      <div>
        <Link href="/profile" className="">
          <div className="bg-light-orange rounded-full w-16.25 h-16.25 flex justify-center items-center">
            <span className="text-sm font-normal text-black-font">TODO</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
