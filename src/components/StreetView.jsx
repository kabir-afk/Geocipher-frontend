import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

export function StreetView() {
  function getRndInteger(min, max) {
    return (Math.random() * (max - min + 1) + min).toFixed(6);
  }
  let randomLat = parseFloat(getRndInteger(-85, 85));
  let randomLng = parseFloat(getRndInteger(-180, 180));

  let position = { lat: randomLat, lng: randomLng };
  // console.log(position);

  const streetViewRef = useRef(null);
  const streetViewLibrary = useMapsLibrary("streetView");

  function processSVData() {
    new streetViewLibrary.StreetViewPanorama(streetViewRef.current, {
      position,
      pov: { heading: 34, pitch: 10 },
    });
  }

  useEffect(() => {
    if (!streetViewLibrary || !streetViewRef.current) return;

    const sv = new streetViewLibrary.StreetViewService();
    let a = sv
      .getPanorama({
        location: { lat: position.lat, lng: position.lng },
        radius: 50,
      })
      .then(processSVData)
      .catch(() =>
        console.error("Street View data not found for this location.")
      );
    console.log(a);
    console.log(position);
  });

  return <div ref={streetViewRef} style={{ height: "100vh", width: "100%" }} />;
}
