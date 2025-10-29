import {
  APIProvider,
  Map,
  InfoWindow,
  AdvancedMarker,
  useAdvancedMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useState, useRef } from "react";
import { StreetView } from "../components/StreetView";
import { useNavigate } from "react-router-dom";
import { GuessButton } from "../components/GuessButton";
import { NextButton } from "../components/NextButton";
import { Polyline } from "../components/Polyline";
import { Distance } from "../components/Distance";
import axiosInstance from "../axiosinstance";
import Cookies from "js-cookie";
import Waiting from "../components/Waiting";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Multiplayer = () => {
  const defaultPosition = { lat: 19.076, lng: 72.8777 };
  const [randomPosition, setRandomPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [cursor, setCursor] = useState(true);
  const [layout, setLayout] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [__timerState, setTimerState] = useState(false);
  const [round, setRound] = useState(1);
  const markerRefs = useRef({});
  const [userMarkerRef, _userMarker] = useAdvancedMarkerRef();
  const [gameMarkerRef, _gameMarker] = useAdvancedMarkerRef();
  const [gameId, setGameId] = useState(1);
  const [guessReceived, setGuessReceived] = useState(false);
  const [allGuessesReceived, setAllGuessesReceived] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [socketMsg, setSocketMsg] = useState("");
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const layoutClassMap = {
    collapsed: "h-48 w-70 bottom-12 m-2 hover:w-1/3 hover:h-1/2",
    expanded: "h-full w-full bottom-0 m-0",
  };

  const containerClass = layout
    ? layoutClassMap.expanded
    : layoutClassMap.collapsed;

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
  };
  useEffect(() => {
    const websocketProtocol =
      window.location.protocol === "https:" ? "wss" : "ws";
    const accessToken = Cookies.get("accessToken");
    const wsEndpoint = `${websocketProtocol}://localhost:8000/ws/?token=${accessToken}`;
    const socket = new WebSocket(wsEndpoint);

    socket.onmessage = function (event) {
      let data = JSON.parse(event.data);
      if (data.event === "room_full") {
        let pos = { lat: data.coordinate.lat, lng: data.coordinate.lng };
        setRandomPosition(pos);
      } else if (data.event === "guess_received") {
        setGuessReceived(true);
        setSocketMsg(data.message);
      } else if (data.event === "results_ready") {
        console.log(data);
        setAllGuessesReceived(true);
        const list = Object.entries(data.guesses).map(
          ([name, { lat, lng, score, distance }]) => ({
            name,
            pos: { lat, lng },
            score,
            distance,
          })
        );
        setGuesses(list);
        setVisibility(true);
        setLayout(true);
        setTimerState(false);
      }
    };

    socket.onopen = () => {
      console.log("WebSocket connection opened!");
      async function fetchGameId() {
        if (round == 1) {
          const response = await axiosInstance.post("api/v1/game-id");
          setGameId(response.data.id);
        }
      }
      fetchGameId();
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed!");
      navigate("/profile");
    };

    socketRef.current = socket;

    // return () => {
    //   socket.close();
    // };
  }, []);

  function send(data) {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ data }));
    } else {
      console.warn("WebSocket not connected");
    }
  }

  function sendGuess() {
    send({
      event: "guess",
      user_location: markerPosition,
      actual_location: randomPosition,
    });
  }

  return (
    <>
      {randomPosition === null ? (
        <Waiting message={"Waiting for other players to join"} />
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
                        glyphText={"🏳️"}
                        borderColor={"#000"}
                      />
                    </AdvancedMarker>
                  </>
                )}
                {allGuessesReceived === false ? (
                  <AdvancedMarker
                    ref={userMarkerRef}
                    position={markerPosition}
                  />
                ) : (
                  guesses.map((guess, index) => {
                    const markerId = `marker-${index}`;
                    return (
                      <React.Fragment key={markerId}>
                        <Polyline
                          path={[randomPosition, guess.pos]}
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
                        <AdvancedMarker
                          ref={(el) => {
                            if (el) {
                              markerRefs.current[markerId] = el;
                            }
                          }}
                          position={guess.pos}
                        />
                        {markerRefs.current[markerId] && (
                          <InfoWindow
                            className="bg-black text-amber-50"
                            anchor={markerRefs.current[markerId]}
                            maxWidth={200}
                          >
                            <div>
                              <ul>
                                <li>Player : {guess.name}</li>
                                <li>Score : {guess.score}</li>
                                <li>Distance : {guess.distance} KM</li>
                              </ul>
                            </div>
                          </InfoWindow>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </Map>
            </div>
            {guessReceived === false && allGuessesReceived === false ? (
              <div className="absolute z-10 right-1 bottom-4 py-1 w-70 rounded-md text-center bg-green-500 text-amber-50 ">
                <GuessButton
                  position={randomPosition}
                  sendGuess={sendGuess}
                  cursor={cursor}
                  cursorStyle={cursor ? "cursor-not-allowed" : "cursor-pointer"}
                />
              </div>
            ) : guessReceived === true && allGuessesReceived === false ? (
              <Waiting message={socketMsg} />
            ) : (
              <div className="absolute z-10 right-1 bottom-4 py-1 w-70 rounded-md text-center bg-green-500 text-amber-50 ">
                <NextButton
                  cursorStyle={cursor ? "cursor-not-allowed" : "cursor-pointer"}
                  setNextRoundLayout={handleNextRound}
                />
              </div>
            )}
            {visibility && (
              <div>
                <Distance
                  gameId={gameId}
                  round={round}
                  from={{ lat: randomPosition.lat, lng: randomPosition.lng }}
                  to={markerPosition}
                  send={send}
                />
              </div>
            )}
            <StreetView position={randomPosition} />
          </div>
        </APIProvider>
      )}
    </>
  );
};

export default Multiplayer;
