//Import global styles and fonts
//import './globals.css'

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '404 - Page not found',
  description: 'The page you are looking for does not exist.',
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={inter.className}>
      <body>
        <h1>404 - page not found</h1>
        <p>This page does not exist.</p>
      </body>
    </html>
  );
}
