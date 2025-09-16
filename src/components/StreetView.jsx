import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

export function StreetView({ position }) {
  const streetViewRef = useRef(null);
  const streetViewLibrary = useMapsLibrary("streetView");

  useEffect(() => {
    if (!streetViewLibrary || !streetViewRef.current) return;

    // Create the panorama inside the div
    new streetViewLibrary.StreetViewPanorama(streetViewRef.current, {
      position,
      pov: { heading: 34, pitch: 10 },
    });
  }, [streetViewLibrary, position]);

  return <div ref={streetViewRef} style={{ height: "100vh", width: "100%" }} />;
}
