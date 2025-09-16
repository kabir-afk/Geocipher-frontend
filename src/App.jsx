import { APIProvider, Map, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function StreetView({ position }) {
  const streetViewRef = useRef(null);
  const streetViewLibrary = useMapsLibrary("streetView");

  useEffect(() => {
    if (!streetViewLibrary || !streetViewRef.current) return;

    // Create the panorama inside the div
    new streetViewLibrary.StreetViewPanorama(streetViewRef.current, {
      position,
      pov: { heading: 34, pitch: 10 },
    });
  }, [streetViewLibrary, position]);

  return <div ref={streetViewRef} style={{ height: "100vh", width: "100%" }} />;
}

function App() {
  const position = { lat: 53.54992, lng: 10.00678 };

  return (
    <APIProvider apiKey={API_KEY}>
      {/* You can render EITHER Map or StreetView, or both in split-screen */}
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ flex: 1 }}>
          <Map
            defaultCenter={position}
            defaultZoom={14}
            mapId="DEMO_MAP_ID"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <StreetView position={position} />
        </div>
      </div>
    </APIProvider>
  );
}

export default App;
