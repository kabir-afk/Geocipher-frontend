import {
  APIProvider,
  Map,
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { StreetView } from "./components/StreetView";
import { Polyline } from "./components/Polyline";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const position = { lat: 53.54992, lng: 10.00678 };
  // const position2 = { lat: 51.5074, lng: -0.1278 };
  const [markerPosition, setMarkerPosition] = useState(position);
  const [visibility, setVisibility] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  useEffect(() => {
    if (!marker) {
      return;
    }

    // do something with marker instance here
  }, [marker]);
  const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 2,
  };
  return (
    <APIProvider apiKey={API_KEY}>
      <div className="h-full">
        <div className="h-50 w-70 absolute z-10 bottom-0 right-0 transition duration-50 ease hover:scale-200">
          <Map
            defaultCenter={position}
            defaultZoom={2}
            mapId="MAP_ID"
            disableDefaultUI
            onClick={(e) => {
              setVisibility(true);
              setMarkerPosition({
                lat: e.detail.latLng.lat,
                lng: e.detail.latLng.lng,
              });
            }}
          >
            {visibility && (
              <>
                <AdvancedMarker
                  ref={markerRef}
                  position={position}
                  className={visibility}
                />
                <AdvancedMarker
                  ref={markerRef}
                  position={markerPosition}
                  className={visibility}
                />
                <Polyline
                  path={[position, markerPosition]}
                  geodesic={true}
                  strokeOpacity={0}
                  strokeWeight={2}
                  strokeColor={"#FF0000"}
                  icons={[
                    {
                      icon: lineSymbol,
                      offset: "0",
                      repeat: "10px",
                    },
                  ]}
                />
              </>
            )}
          </Map>
        </div>
        <div className="fixed h-full w-full">
          <StreetView position={position} />
        </div>
      </div>
    </APIProvider>
  );
}

export default App;
