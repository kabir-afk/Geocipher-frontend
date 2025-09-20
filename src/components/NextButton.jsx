export function NextButton({ setLayout }) {
  return (
    <button
      type="button"
      className={"w-full h-full cursor-pointer"}
      onClick={setLayout}
    >
      NEXT
    </button>
  );
}
