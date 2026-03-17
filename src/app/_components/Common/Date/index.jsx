import Image from 'next/image';

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
        className="w-[15px] h-[15px]"
      />
      <div className="text-black text-inter text-xs font-normal">
        {date} TODO
      </div>
    </div>
  );
}

export default Date;
