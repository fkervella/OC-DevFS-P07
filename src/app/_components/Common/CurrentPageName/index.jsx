'use client';

import { usePathname } from 'next/navigation';

/**
 * CurrentPageName renvoie le nom de la page affichée actuellement côté client
 *
 * @returns {string} Nom de la page en cours
 */

function CurrentPageName() {
  const pathname = usePathname();
  const pageName = pathname.split('/').filter(Boolean).pop();

  return pageName;
}

export default CurrentPageName;
