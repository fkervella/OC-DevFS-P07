import Image from 'next/image';
import Link from 'next/link';

function ExpandButton({ page }) {
  return (
    <Link
      href={page}
      className="border border-solid border-grey-background bg-white rounded-lg w-14.25 h-14.25 flex justify-center items-center"
    >
      <Image
        src="/tickBlackIcon.png"
        alt="Bouton retour"
        width={16}
        height={16}
        style={{ width: '100%', height: 'auto' }}
      />
    </Link>
  );
}

export default ExpandButton;
