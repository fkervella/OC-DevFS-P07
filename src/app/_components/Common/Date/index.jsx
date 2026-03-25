import Image from 'next/image';

import { formatDateFR } from '@/app/lib/utils';

/**
 * Date affiche la date passée en paramètre, au format prévu
 *
 * @param {string} date - date à affichée
 * @returns {string} - code HTML de la date passée en paramètre
 */

function Date({ date }) {
  return (
    <div className="flex flex-row gap-2">
      <div className="text-grey-font text-inter text-xs font-normal">
        Echéance :{' '}
      </div>
      <Image
        src="/kanbanGreyIcon.png"
        alt="calendrier"
        width={15}
        height={17}
      />
      <div className="text-black text-inter text-xs font-normal">
        {formatDateFR(date)}
      </div>
    </div>
  );
}

export default Date;
