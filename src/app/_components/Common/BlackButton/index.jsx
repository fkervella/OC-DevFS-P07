export default function BlackButton({ text, type, onClick = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-black text-white rounded-lg mt-4 pt-2 pb-2 pr-15 pl-15 font-inter h-fit w-fit"
    >
      {text}
    </button>
  );
}
