import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";

export function CustomAdvancedMarker({ guess }) {
  const { pos, name, score, distance } = guess;
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <AdvancedMarker
      position={pos}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {clicked ? (
        <div className="absolute left-3 -translate-x-1/2 bottom-11">
          <div
            className={`bg-black text-white px-3 py-2 bottm-18 rounded-lg shadow-lg transition-all ${
              hovered ? "scale-110" : "scale-100"
            }`}
          >
            <div className="text-md w-fit">
              <ul>
                <li>Player : {name}</li>
                <li>Score : {score}</li>
                <li>Distance : {distance} KM</li>
              </ul>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black" />
        </div>
      ) : (
        <Pin />
      )}
    </AdvancedMarker>
  );
}
