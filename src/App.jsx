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
import { GuessButton } from "./components/GuessButton";
import { NextButton } from "./components/NextButton";
import { Round } from "./components/Round";
import { Timer } from "./components/Timer";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const defaultPosition = { lat: 19.076, lng: 72.8777 };
  const [randomPosition, setRandomPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [cursor, setCursor] = useState(true);
  const [layout, setLayout] = useState("collapsed");
  const [visibility, setVisibility] = useState(false);
  const [timerState, setTimerState] = useState(true);
  const [round, setRound] = useState(1);
  const gameMarkerRef = useAdvancedMarkerRef();
  const userMarkerRef = useAdvancedMarkerRef();
  const layoutClassMap = {
    collapsed: "h-48 w-70 bottom-12 m-2 hover:w-1/3 hover:h-1/2",
    expanded: "h-full w-full bottom-0 m-0",
  };

  const containerClass =
    layout === "expanded" ? layoutClassMap.expanded : layoutClassMap.collapsed;

  function stateChange() {
    if (markerPosition !== null) {
      setVisibility(true);
      setLayout("expanded");
      setTimerState(false);
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
      <div className="h-full font-overpass font-bold">
        <div
          className={`rounded-md overflow-hidden absolute z-10 right-0 bg-transparent backdrop-blur-3xl transition duration-50 ease ${containerClass}`}
        >
          <Map
            key={round}
            defaultCenter={defaultPosition}
            defaultZoom={2}
            mapId="MAP_ID"
            disableDefaultUI
            onClick={(e) => {
              visibility
                ? e.preventDefault()
                : setMarkerPosition({
                    lat: e.detail.latLng.lat,
                    lng: e.detail.latLng.lng,
                  });
              setCursor(false);
            }}
          >
            {visibility && (
              <>
                <AdvancedMarker ref={gameMarkerRef} position={randomPosition}>
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
        <div className="absolute z-10 right-1 bottom-4 py-1 w-70 rounded-md text-center bg-green-500 text-amber-50 ">
          {visibility === false ? (
            <GuessButton
              position={randomPosition}
              stateChange={stateChange}
              cursor={cursor}
              cursorStyle={cursor ? "cursor-not-allowed" : "cursor-pointer"}
            />
          ) : (
            <NextButton
              cursorStyle={cursor ? "cursor-not-allowed" : "cursor-pointer"}
              setLayout={() => {
                setRound((roundNum) => roundNum + 1);
                setLayout("collapsed");
                setVisibility(false);
                setMarkerPosition(null);
                setRandomPosition(null);
                setCursor(true);
                setTimerState(true);
              }}
            />
          )}
        </div>
        {visibility && (
          <div>
            <Distance
              from={{ lat: randomPosition.lat(), lng: randomPosition.lng() }}
              to={markerPosition}
            />
          </div>
        )}
        <Timer timerState={timerState} />
        <Round round={round} />
        <div className="h-full w-full">
          <StreetView key={round} onDataSend={getPosition} />
        </div>
      </div>
    </APIProvider>
  );
}

export default App;
