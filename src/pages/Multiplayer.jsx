import {
  APIProvider,
  Map,
  AdvancedMarker,
  useAdvancedMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";
import { useEffect, useState, useRef } from "react";
import { ShimmerDiv } from "shimmer-effects-react";
import { StreetView } from "../components/StreetView";
import { useNavigate } from "react-router-dom";
import { GuessButton } from "../components/GuessButton";
import { NextButton } from "../components/NextButton";
import { Polyline } from "../components/Polyline";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Multiplayer = () => {
  // const [data, setData] = useState("");
  const defaultPosition = { lat: 19.076, lng: 72.8777 };
  const [randomPosition, setRandomPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [cursor, setCursor] = useState(true);
  const [layout, setLayout] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [timerState, setTimerState] = useState(false);
  const [round, setRound] = useState(1);
  const [userMarkerRef, _userMarker] = useAdvancedMarkerRef();
  const [gameMarkerRef, _gameMarker] = useAdvancedMarkerRef();
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const layoutClassMap = {
    collapsed: "h-48 w-70 bottom-12 m-2 hover:w-1/3 hover:h-1/2",
    expanded: "h-full w-full bottom-0 m-0",
  };

  const containerClass = layout
    ? layoutClassMap.expanded
    : layoutClassMap.collapsed;

  function send(data) {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message: data }));
    } else {
      console.warn("WebSocket not connected");
    }
  }

  const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 2,
  };
  function stateChange() {
    if (markerPosition !== null) {
      setVisibility(true);
      setLayout(true);
      setTimerState(false);
    }
  }
  const handleNextRound = () => {
    setRound((roundNum) => (roundNum >= 3 ? 1 : roundNum + 1));
    setLayout(false);
    setVisibility(false);
    setMarkerPosition(null);
    setCursor(true);
    setTimerState(true);
  };
  useEffect(() => {
    const websocketProtocol =
      window.location.protocol === "https:" ? "wss" : "ws";
    const wsEndpoint = `${websocketProtocol}://localhost:8000/ws/`;
    const socket = new WebSocket(wsEndpoint);

    socket.onmessage = function (event) {
      let data = JSON.parse(event.data);
      if (JSON.parse(event.data).event === "room_full") {
        let pos = { lat: data.coordinate.lat, lng: data.coordinate.lng };
        setRandomPosition(pos);
      }
    };

    socket.onopen = () => {
      console.log("WebSocket connection opened!");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed!");
    };

    socketRef.current = socket;

    // return () => {
    //   socket.close();
    // };
  }, []);

  useEffect(() => {
    console.log(randomPosition);
  }, [randomPosition]);

  return (
    <>
      {randomPosition === null ? (
        <ShimmerDiv mode="dark" height="100vh" width="100vw" loading={true} />
      ) : (
        <APIProvider apiKey={API_KEY}>
          <div className="h-full font-overpass font-bold">
            <div
              className={`rounded-md overflow-hidden absolute z-10 right-0 bg-transparent backdrop-blur-3xl transition duration-50 ease ${containerClass}`}
            >
              <Map
                // key={round}
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
                    <AdvancedMarker
                      ref={gameMarkerRef}
                      position={randomPosition}
                    >
                      <Pin
                        background={"#000"}
                        glyph={"🏳️"}
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
            <div className="absolute z-10 right-1 bottom-4 py-1 w-70 rounded-md text-center bg-green-500 text-amber-50 ">
              {visibility === false ? (
                <GuessButton
                  position={randomPosition}
                  stateChange={stateChange}
                  cursor={cursor}
                  cursorStyle={cursor ? "cursor-not-allowed" : "cursor-pointer"}
                />
              ) : round === 3 ? (
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
            <StreetView position={randomPosition} />
          </div>
        </APIProvider>
      )}
    </>
  );
};

export default Multiplayer;
