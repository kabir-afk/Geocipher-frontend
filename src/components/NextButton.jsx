export function NextButton({ setNextRoundLayout }) {
  return (
    <button
      type="button"
      className={"w-full h-full cursor-pointer"}
      onClick={setNextRoundLayout}
    >
      NEXT
    </button>
  );
}
