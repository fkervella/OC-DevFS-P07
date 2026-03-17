import Image from 'next/image';
import Link from 'next/link';

function DetailsButton({ page }) {
  return (
    <Link href={page}>
      <div className="border border-solid border-grey-background bg-white rounded-lg w-14.25 h-14.25 flex justify-center items-center">
        <Image
          src="/3DotsGreyIcon.png"
          alt="Bouton retour"
          width={16}
          height={8}
          className=""
        />
      </div>
    </Link>
  );
}

export default DetailsButton;
