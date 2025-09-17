import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export function Distance({ from, to }) {
  const [distance, setDistance] = useState(null);
  const geometryLibrary = useMapsLibrary("geometry");

  useEffect(() => {
    if (!geometryLibrary) return;

    const dist = geometryLibrary.spherical.computeDistanceBetween(
      { lat: from.lat, lng: from.lng },
      { lat: to.lat, lng: to.lng }
    );
    setDistance(dist);
  }, [geometryLibrary, from, to]);

  return (
    <div className="absolute z-10 w-70 h-20 bg-yellow-200">
      {distance >= 1000
        ? `${Math.round(distance / 1000)} kilometres`
        : `${Math.round(distance)} meters`}
    </div>
  );
}
