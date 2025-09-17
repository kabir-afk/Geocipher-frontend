import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { StreetView } from "./components/StreetView";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const position = { lat: 53.54992, lng: 10.00678 };

  return (
    <APIProvider apiKey={API_KEY}>
      {/* You can render EITHER Map or StreetView, or both in split-screen */}
      <div className="h-full">
        <div className="h-80 w-4/10 absolute z-10 bottom-0 right-0 hover:h-100 hover:w-1/2">
          <Map
            defaultCenter={position}
            defaultZoom={14}
            mapId="MAP_ID"
            disableDefaultUI
          />
        </div>
        <div className="fixed h-full w-full">
          <StreetView position={position} />
        </div>
      </div>
    </APIProvider>
  );
}

export default App;
