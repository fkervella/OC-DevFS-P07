export default function BlackButton({ text, type }) {
  return (
    <button
      type={type}
      className="bg-black text-white rounded-lg mt-4 pt-2 pb-2 pr-15 pl-15 font-inter h-fit w-fit"
    >
      {text}
    </button>
  );
}
