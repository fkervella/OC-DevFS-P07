import '@/app/globals.css';

import Footer from '../_components/Footer';
import Header from '../_components/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Abricot, l&apos;application qu&apos;il vous faut</title>
      </head>
      <body className="bg-grey-background">
        <Header />
        <main className="h-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
