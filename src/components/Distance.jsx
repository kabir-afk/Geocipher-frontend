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
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-fit bg-purple-600 text-white p-2 rounded-2xl text-center">
      Your guess was{" "}
      {distance >= 1000
        ? `${Math.round(distance / 1000)} KM`
        : `${Math.round(distance)} meters`}{" "}
      from the correct location
    </div>
  );
}
