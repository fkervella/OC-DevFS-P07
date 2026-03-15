import '../globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>Abricot, l&apos;application qu&apos;il vous faut</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
