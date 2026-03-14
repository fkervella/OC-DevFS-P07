export default function BlackButton({ text, type }) {
  return (
    <button
      type={type}
      className="m-auto bg-black text-white rounded-lg mt-4 pt-2 pb-2 pr-15 pl-15"
    >
      {text}
    </button>
  );
}
