import {
  APIProvider,
  Map,
  AdvancedMarker,
  useAdvancedMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";
import { StreetView } from "./components/StreetView";
import { Polyline } from "./components/Polyline";
import { useState } from "react";
import { Distance } from "./components/Distance";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const defaultPosition = { lat: 19.076, lng: 72.8777 };
  const [randomPosition, setRandomPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [cursor, setCursor] = useState("cursor-not-allowed");
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
        <div className="rounded-md overflow-hidden h-50 w-70 absolute z-10 bottom-12 right-0 m-2 transition duration-50 ease hover:w-1/3 hover:h-1/2">
          <Map
            defaultCenter={defaultPosition}
            defaultZoom={2}
            mapId="MAP_ID"
            disableDefaultUI
            onClick={(e) => {
              setMarkerPosition({
                lat: e.detail.latLng.lat,
                lng: e.detail.latLng.lng,
              });
              setCursor("cursor-pointer");
            }}
          >
            {visibility && (
              <>
                <AdvancedMarker
                  ref={markerRef}
                  position={randomPosition}
                  className={visibility}
                >
                  <Pin background={"#000"} glyph={"🏳️"} borderColor={"#000"} />
                </AdvancedMarker>

                <Polyline
                  path={[randomPosition, markerPosition]}
                  strokeOpacity={0}
                  strokeWeight={2}
                  strokeColor={"#000"}
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
            <AdvancedMarker
              ref={markerRef}
              position={markerPosition}
              className={visibility}
            />
          </Map>
        </div>
        <div className="absolute z-10 right-0 bottom-0 h-10 m-2 w-70 rounded-md text-center bg-gray-500 text-amber-50 ">
          <button
            type="submit"
            className={`w-full h-full ${cursor}`}
            onClick={() => {
              if (markerPosition !== null) {
                setVisibility(true);
              }
            }}
          >
            Guess
          </button>
        </div>
        {visibility && (
          <Distance
            from={{ lat: randomPosition.lat(), lng: randomPosition.lng() }}
            to={markerPosition}
          />
        )}
        <div className="h-full w-full">
          <StreetView onDataSend={getPosition} />
        </div>
      </div>
    </APIProvider>
  );
}

export default App;
