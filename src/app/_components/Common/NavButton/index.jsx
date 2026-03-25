import Image from 'next/image';
import Link from 'next/link';

/**
 * NavButton bouton de la page de navigation
 *
 * @param {string} name texte affiché dans le bouton
 * @param {string} imagePath image du bouton
 * @param {string} imageAlt texte alternatif de l'image du bouton
 * @param {boolean} isActive la page active est la page qui s'affiche lors de l'appui sur le bouton
 * @param {string} page à laquelle rediriger lors de l'appui sur le bouton
 * @returns {string} code HTML du bouton de navigation
 */

function NavButton({ name, imagePath, imageAlt, isActive, page }) {
  const background = isActive ? 'bg-black rounded-lg' : 'bg-white';
  const text = isActive ? 'bg-white' : 'text-orange';

  return (
    <Link href={page}>
      <div
        className={`${background} flex flex-row pt-4 pr-10 pb-4 pl-10 gap-2 lg:gap-4 justify-center`}
      >
        <Image src={imagePath} alt={imageAlt} width={24} height={24} />
        <span className={`${text} text-base font-normal`}>{name}</span>
      </div>
    </Link>
  );
}

export default NavButton;
