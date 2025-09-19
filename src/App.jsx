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
import { PanToButton } from "./components/PanToButton";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const defaultPosition = { lat: 19.076, lng: 72.8777 };
  const [randomPosition, setRandomPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [cursor, setCursor] = useState("cursor-not-allowed");
  const [style, setStyle] = useState({
    width: "70",
    height: "50",
    margin: "2",
    hoverWidth: "hover:w-1/3",
    hoverHeight: "hover:h-1/2",
    bottom: "12",
  });
  const [visibility, setVisibility] = useState(false);
  const gameMarkerRef = useAdvancedMarkerRef();
  const userMarkerRef = useAdvancedMarkerRef();
  function stateChange() {
    if (markerPosition !== null) {
      setVisibility(true);
      setStyle({
        width: "full",
        height: "full",
        margin: "0",
        hoverWidth: "none",
        hoverHeight: "none",
        bottom: "0",
      });
    }
  }

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
        <div
          className={`rounded-md overflow-hidden h-${style.height} w-${style.width} absolute z-10 bottom-${style.bottom} right-0 m-${style.margin} transition duration-50 ease ${style.hoverWidth} ${style.hoverHeight}`}
        >
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
                  ref={gameMarkerRef}
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
            <AdvancedMarker ref={userMarkerRef} position={markerPosition} />
          </Map>
        </div>
        <div className="absolute z-10 right-0 bottom-0 h-10 m-2 w-70 rounded-md text-center bg-gray-500 text-amber-50 ">
          <PanToButton
            position={randomPosition}
            stateChange={stateChange}
            cursor={cursor}
          />
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
