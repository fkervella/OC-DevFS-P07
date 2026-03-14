export default function LabelInput({ name, text }) {
  return (
    <>
      <label htmlFor={name} className="black font-normal mt-4 text-sm">
        {text}
      </label>
      <input
        name={name}
        id={name}
        className="rounded-lg pt-2 pr-2 pb-2 pl-2 border border-gray-200 w-xs"
      ></input>
    </>
  );
}
