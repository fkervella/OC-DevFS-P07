import '@/app/globals.css';

import { Inter, Manrope } from 'next/font/google';

import Footer from '../_components/Footer';
import Header from '../_components/Header';

const inter = Inter({ subsets: ['latin'] });
const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.className} ${manrope.className}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Abricot, l&apos;application qu&apos;il vous faut</title>
      </head>
      <body className="bg-background">
        <Header />
        <main className="h-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
