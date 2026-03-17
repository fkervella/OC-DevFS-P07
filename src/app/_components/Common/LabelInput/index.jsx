export default function LabelInput({ name, text, type, placeHolder }) {
  return (
    <>
      <label
        htmlFor={name}
        className="black font-normal mt-4 text-sm text-black-font font-inter"
      >
        {text}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        placeHolder={placeHolder}
        className="rounded-lg pt-2 pr-2 pb-2 pl-2 border border-gray-200 w-xs bg-white"
      ></input>
    </>
  );
}
