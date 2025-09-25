import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

export function StreetView({ position }) {
  const streetViewRef = useRef(null);
  const panoramaRef = useRef(null);
  const streetViewLibrary = useMapsLibrary("streetView");

  useEffect(() => {
    if (!streetViewLibrary || !streetViewRef.current || !position) return;
    if (!panoramaRef.current) {
      panoramaRef.current = new streetViewLibrary.StreetViewPanorama(
        streetViewRef.current,
        {
          position: position,
          pov: { heading: 34, pitch: 10 },
          visible: true,
          showRoadLabels: false,
          disableDefaultUI: true,
          rotateControl: true,
          zoomControl: true,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.LEFT_BOTTOM,
          },
          panControl: true,
          panControlOptions: {
            position: window.google.maps.ControlPosition.LEFT_BOTTOM,
          },
        }
      );
    }
  }, [position, streetViewLibrary]);

  useEffect(() => {
    if (panoramaRef.current && position) {
      panoramaRef.current.setPosition(position);
    }
  }, [position]);

  return (
    <div ref={streetViewRef} style={{ height: "100vh", width: "100vw" }} />
  );
}
