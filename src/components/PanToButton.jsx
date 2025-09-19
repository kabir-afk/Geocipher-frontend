import { useMap } from "@vis.gl/react-google-maps";

export function PanToButton({ position, stateChange, cursor }) {
  const map = useMap();
  let zoom = 1;
  function pan(event) {
    event.preventDefault();
    map.panTo(position);
    if (map.getZoom() == 14) {
      return;
    } else {
      window.setTimeout(() => {
        map.setZoom(zoom++);
        console.log(map.getZoom());
        pan(event);
      }, 250);
    }
  }
  function panToPosition(event) {
    event.preventDefault();
    if (stateChange) stateChange();
    pan(event);
  }
  return (
    <button
      type="submit"
      className={`w-full h-full ${cursor}`}
      onClick={panToPosition}
    >
      GUESS
    </button>
  );
}
