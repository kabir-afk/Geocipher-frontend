import {
  APIProvider,
  Map,
  AdvancedMarker,
  useAdvancedMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";
import { StreetView } from "./components/StreetView";
import { Polyline } from "./components/Polyline";
import { useEffect, useState } from "react";
import { Distance } from "./components/Distance";
import { GuessButton } from "./components/GuessButton";
import { NextButton } from "./components/NextButton";
import { Round } from "./components/Round";
import { Timer } from "./components/Timer";
import { ShimmerDiv } from "shimmer-effects-react";
import axios from "axios";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosinstance";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const defaultPosition = { lat: 19.076, lng: 72.8777 };
  const [coords, setCoords] = useState([]);
  const [randomPosition, setRandomPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [cursor, setCursor] = useState(true);
  const [layout, setLayout] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [timerState, setTimerState] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isToggleBtn, setIsToggleBtn] = useState(true);
  const [round, setRound] = useState(1);
  const [gameId, setGameId] = useState(1);
  const [userMarkerRef, _userMarker] = useAdvancedMarkerRef();
  const [gameMarkerRef, _gameMarker] = useAdvancedMarkerRef();
  const navigate = useNavigate();
  const layoutClassMap = {
    collapsed: "h-48 w-80 bottom-12 m-2 hover:w-1/3 hover:h-1/2",
    expanded: "h-full w-full bottom-0 m-0",
  };

  const containerClass = layout
    ? layoutClassMap.expanded
    : layoutClassMap.collapsed;

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/"
          // "https://geoguesser-clone-backend.onrender.com/api/v1/"
          // "https://geoguesser-clone-backend-production.up.railway.app/api/v1/"
        );
        setCoords(response.data);
      } catch (error) {
        console.error("Error fetching coordinates", error);
      }
    }
    fetchCoordinates();
  }, [round]);

  useEffect(() => {
    let randomPosition = { lat: +coords.lat, lng: +coords.lng };
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
    setRandomPosition(randomPosition);
    setTimerState(true);
    async function fetchGameId() {
      if (round == 1) {
        const response = await axiosInstance.post("api/v1/game-id");
        setGameId(response.data.id);
      }
    }
    fetchGameId();
  }, [round, coords]);

  const handleTimeFinish = () => {
    setVisibility(true);
    setLayout(true);
    setTimerState(false);
  };

  function stateChange() {
    if (markerPosition !== null) {
      setVisibility(true);
      setLayout(true);
      setTimerState(false);
    }
    if (isMobile) {
      setIsToggleBtn(false);
    }
  }

  const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 2,
  };

  const handleNextRound = () => {
    setRound((roundNum) => (roundNum >= 3 ? 1 : roundNum + 1));
    setLayout(false);
    setVisibility(false);
    setMarkerPosition(null);
    setCursor(true);
    setTimerState(true);
    if (isMobile) {
      setShowMap(false);
      setIsToggleBtn(true);
    }
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <div className="h-full font-overpass font-bold">
        {(!isMobile || showMap) && (
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
                    <Pin
                      background={"#000"}
                      glyphText={"🏳️"}
                      borderColor={"#000"}
                    />
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
        )}

        <div className="w-full absolute z-10 bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center gap-2 xl:not-last:justify-end">
          {visibility && (
            <div>
              <Distance
                gameId={gameId}
                round={round}
                from={{ lat: randomPosition.lat, lng: randomPosition.lng }}
                to={markerPosition}
              />
            </div>
          )}
          {isMobile && isToggleBtn && (
            <button
              className="fixed bottom-10 right-2 p-3 rounded-full text-center bg-blue-500 text-amber-50 cursor-pointer uppercase"
              onClick={() => {
                setShowMap(!showMap);
                setLayout(!layout);
              }}
            >
              <img src="/image.png" alt="map-icon" width={40} height={40} />
            </button>
          )}
          {visibility === false ? (
            (!isMobile || (isMobile && showMap)) && (
              <GuessButton
                position={randomPosition}
                stateChange={stateChange}
                cursor={cursor}
                cursorStyle={cursor ? "cursor-not-allowed" : "cursor-pointer"}
              />
            )
          ) : (
            <div className="py-1 w-80 rounded-md text-center bg-green-500 text-amber-50 lg-button-pos">
              {round === 3 ? (
                <button
                  className={"w-full h-full cursor-pointer uppercase"}
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  finish game
                </button>
              ) : (
                <NextButton
                  cursorStyle={cursor ? "cursor-not-allowed" : "cursor-pointer"}
                  setNextRoundLayout={handleNextRound}
                />
              )}
            </div>
          )}
        </div>

        <div className="w-full absolute z-10 left-1/2 transform -translate-x-1/2 md:top-5 flex flex-col justify-center items-center gap-3">
          <Navbar />
          <Timer timerState={timerState} onTimeFinish={handleTimeFinish} />
        </div>
        <Round round={round} />
        <div className="z-0 h-full w-full">
          {!timerState ? (
            <ShimmerDiv
              mode="dark"
              height="100vh"
              width="100vw"
              loading={true}
            />
          ) : (
            <StreetView position={randomPosition} />
          )}
        </div>
      </div>
    </APIProvider>
  );
}

export default App;
