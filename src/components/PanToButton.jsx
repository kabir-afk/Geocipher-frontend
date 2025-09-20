import { useMap } from "@vis.gl/react-google-maps";

export function PanToButton({ position, stateChange, cursor, cursorStyle }) {
  const map = useMap();
  function zoomOutAndIn(event) {
    event.preventDefault();
    let minZoom = 1;
    let maxZoom = 14;
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
    if (stateChange) stateChange();
    zoomOutAndIn(event);
  }
  return (
    <button
      type="submit"
      disabled={cursor}
      className={`w-full h-full ${cursorStyle}`}
      onClick={panToPosition}
    >
      GUESS
    </button>
  );
}
