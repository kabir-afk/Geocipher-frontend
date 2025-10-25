import React, { useEffect, useState, useRef } from "react";

const Multiplayer = () => {
  const [data, setData] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const websocketProtocol =
      window.location.protocol === "https:" ? "wss" : "ws";
    const wsEndpoint = `${websocketProtocol}://localhost:8000/ws/`;
    const socket = new WebSocket(wsEndpoint);

    socket.onmessage = function (event) {
      console.log(event.data);
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

  function send(data) {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message: data }));
    } else {
      console.warn("WebSocket not connected");
    }
  }

  return (
    <>
      Multiplayer
      <div>
        <input
          type="text"
          name="data"
          id="data"
          value={data}
          placeholder="send something"
          onChange={(e) => setData(e.target.value)}
        />
        <button
          onClick={() => send(data)} // Note: onClick, not onSubmit for buttons
        >
          Send
        </button>
      </div>
    </>
  );
};

export default Multiplayer;
