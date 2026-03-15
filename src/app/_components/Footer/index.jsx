import Image from 'next/image';

function Footer() {
  return (
    <div className="bg-white flex flex-col lg:flex-row lg:justify-between gap-2 items-center pt-1 pr-10 pb-1 pl-10">
      <Image
        src="/logoAbricotNoir.png"
        alt="Logo Abricot"
        width={100}
        height={13}
      />
      <div className="text-base font-normal">Abricot 2026</div>
    </div>
  );
}

export default Footer;
