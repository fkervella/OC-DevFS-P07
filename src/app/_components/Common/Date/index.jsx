import Image from 'next/image';

import { formatDateFR } from '@/app/lib/utils';

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
