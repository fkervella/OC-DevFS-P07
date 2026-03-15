import Image from 'next/image';

function Footer() {
  return (
    <div className="footer-content">
      <Image
        src="/logoAbricotNoir.png"
        alt="Logo Abricot"
        width={253}
        height={33}
      />
      <div>Abricot 2026</div>
    </div>
  );
}

export default Footer;
