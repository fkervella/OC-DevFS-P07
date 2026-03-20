import Image from 'next/image';
import Link from 'next/link';

function LeftArrowButton({ page }) {
  return (
    <Link href={page}>
      <div className="border border-solid border-grey-background bg-white rounded-lg w-14.25 h-14.25 flex justify-center items-center">
        <Image
          src="/leftArrowBlackIcon.png"
          alt="Bouton retour"
          width={16}
          height={8}
        />
      </div>
    </Link>
  );
}

export default LeftArrowButton;
