import {
  APIProvider,
  Map,
  Marker,
  useMarkerRef,
} from "@vis.gl/react-google-maps";
import { StreetView } from "./components/StreetView";
import { useEffect } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const position = { lat: 53.54992, lng: 10.00678 };
  const [markerRef, marker] = useMarkerRef();

  useEffect(() => {
    if (!marker) {
      return;
    }

    // do something with marker instance here
  }, [marker]);

  return (
    <APIProvider apiKey={API_KEY}>
      {/* You can render EITHER Map or StreetView, or both in split-screen */}
      <div className="h-full">
        <div className="h-50 w-70 absolute z-10 bottom-0 right-0 transition duration-50 ease hover:scale-200">
          <Map
            defaultCenter={position}
            defaultZoom={2}
            mapId="MAP_ID"
            disableDefaultUI
          >
            <Marker ref={markerRef} position={position} />
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
