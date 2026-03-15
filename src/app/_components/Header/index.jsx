import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <div className="header-content">
      <div className="logoBrand">
        <Image
          className="logo"
          src="/logoAbricot.png"
          alt="logo"
          width={253}
          height={33}
        />
      </div>
      <nav className="nav">
        <Link href="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link href="/projects" className="nav-link">
          Projets
        </Link>
        <Link href="/profile" className="nav-link">
          Mon profil
        </Link>
      </nav>
    </div>
  );
}

export default Header;
