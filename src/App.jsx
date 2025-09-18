import {
  APIProvider,
  Map,
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { StreetView } from "./components/StreetView";
import { Polyline } from "./components/Polyline";
import { useState } from "react";
import { Distance } from "./components/Distance";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  // const position = { lat: 48.8566, lng: 2.3522 };
  const defaultPosition = { lat: 19.076, lng: 72.8777 };
  const [randomPosition, setRandomPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [markerRef] = useAdvancedMarkerRef();

  const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 2,
  };
  const getPosition = (position) => {
    setRandomPosition(position);
  };
  return (
    <APIProvider apiKey={API_KEY}>
      <div className="h-full">
        <div className="rounded-md overflow-hidden h-50 w-70 absolute z-10 bottom-0 right-0 mb-4 mr-16 transition duration-50 ease hover:w-90 hover:h-60">
          <Map
            defaultCenter={defaultPosition}
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
                  position={randomPosition}
                  className={visibility}
                />
                <AdvancedMarker
                  ref={markerRef}
                  position={markerPosition}
                  className={visibility}
                />
                <Polyline
                  path={[randomPosition, markerPosition]}
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
        {visibility && <Distance from={randomPosition} to={markerPosition} />}
        <div className="h-full w-full">
          <StreetView onDataSend={getPosition} />
        </div>
      </div>
    </APIProvider>
  );
}

export default App;
