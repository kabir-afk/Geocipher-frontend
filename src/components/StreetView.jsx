import { useMapsLibrary } from "@vis.gl/react-google-maps";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export function StreetView({ onDataSend }) {
  const [position, setPosition] = useState(null);
  const [layout, setLayout] = useState(false);
  const streetViewRef = useRef(null);
  const streetViewLibrary = useMapsLibrary("streetView");

  const svLayout = {
    collapsed: { height: 0, width: 0 },
    expanded: { height: "100vh", width: "100vw" },
  };

  const layoutClassSv = layout ? svLayout.expanded : svLayout.collapsed;

  async function getRandomCoordinates() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/");
      let randomPostion =
        response.data.coordinates[
          Math.floor(Math.random() * response.data.coordinates.length - 1)
        ];
      randomPostion = { lat: +randomPostion.lat, lng: +randomPostion.lng };
      console.log(randomPostion);

      setPosition(randomPostion);
      onDataSend(randomPostion);
      setLayout(true);
    } catch (error) {
      console.error("Some error", error);
    }
  }

  useEffect(() => {
    if (streetViewLibrary) {
      getRandomCoordinates();
    }
  }, [streetViewLibrary]);

  useEffect(() => {
    if (!streetViewLibrary || !streetViewRef.current || !position) return;
    new streetViewLibrary.StreetViewPanorama(streetViewRef.current, {
      position: position,
      pov: { heading: 34, pitch: 10 },
      visible: true,
      showRoadLabels: false,
      disableDefaultUI: true,
      rotateControl: true,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
      },
      panControl: true,
      panControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
      },
    });
  }, [position, streetViewLibrary]);

  return <div ref={streetViewRef} style={layoutClassSv} />;
}
