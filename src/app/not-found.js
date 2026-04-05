import Link from 'next/link';

/**
 * NotFound fonction d'afficjage en cas de ressource non trouvée
 *
 * @export
 * @returns {string} Code HTML d'afficjage en cas de ressource non trouvée
 */

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
