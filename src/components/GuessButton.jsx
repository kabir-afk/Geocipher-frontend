import { useMap } from "@vis.gl/react-google-maps";

export function GuessButton({
  position,
  sendGuess,
  stateChange,
  cursor,
  cursorStyle,
  mapState,
}) {
  const map = useMap();
  function zoomOutAndIn(event) {
    event.preventDefault();
    let minZoom = 3;
    let maxZoom = 8;
    // Step 1: Zoom out to minZoom
    function zoomOutStep() {
      if (map.getZoom() > minZoom) {
        map.setZoom(map.getZoom() - 1);
        setTimeout(zoomOutStep, 250);
      } else {
        // Step 2: Pan to position and zoom in to maxZoom
        map.panTo(position);
        setTimeout(zoomInStep, 250);
      }
    }
    function zoomInStep() {
      if (map.getZoom() < maxZoom) {
        map.setZoom(map.getZoom() + 1);
        setTimeout(zoomInStep, 250);
      }
    }
    zoomOutStep();
  }
  function panToPosition(event) {
    event.preventDefault();
    if (stateChange) {
      stateChange();
      zoomOutAndIn(event);
    } else if (sendGuess) sendGuess();
  }
  const btnVis = mapState ? "visible" : "invisible";
  return (
    <button
      type="submit"
      disabled={cursor}
      className={`${btnVis} md:visible w-80 h-full ${cursorStyle} uppercase py-1 rounded-md text-center bg-green-500 text-amber-50 ml-auto mr-2`}
      onClick={panToPosition}
    >
      guess
    </button>
  );
}
