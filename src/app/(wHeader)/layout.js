import Footer from '../_components/Footer';
import Header from '../_components/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>Abricot, l&apos;application qu&apos;il vous faut</title>
      </head>
      <Header />
      <body>{children}</body>
      <Footer />
    </html>
  );
}
