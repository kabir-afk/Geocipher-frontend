import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

export function StreetView({ onDataSend }) {
  const [position, setPosition] = useState(null);
  const [layout, setLayout] = useState(true);
  const streetViewRef = useRef(null);
  const streetViewLibrary = useMapsLibrary("streetView");

  const svLayout = {
    collapsed: "h-0 w-0",
    expanded: "h-full w-full",
  };

  const layoutClassSv =
    layout === "expanded" ? svLayout.expanded : svLayout.collapsed;

  function getRandomCoordinates() {
    const lat = Math.random() * 170 - 85; // to avoid poles
    const lng = Math.random() * 360 - 180;
    return { lat, lng };
  }

  const searchForStreetView = () => {
    if (!streetViewLibrary || !streetViewRef.current) return;

    const sv = new streetViewLibrary.StreetViewService();
    const newPosition = getRandomCoordinates();
    console.log(newPosition);

    sv.getPanorama(
      {
        location: newPosition,
        radius: 10000, // Increased radius to 10km for better success rate
        preference: streetViewLibrary.StreetViewPreference.NEAREST,
      },
      (result, status) => {
        if (status === "OK") {
          setPosition(result.location.latLng);
          onDataSend(result.location.latLng);
          setLayout(false);
        } else {
          console.error("Street View not found. Trying again...");
          // Used RECURSION along with setTimeout to avoid a tight loop and potential performance issues
          setTimeout(searchForStreetView, 50);
        }
      }
    );
  };

  useEffect(() => {
    if (streetViewLibrary) {
      searchForStreetView();
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

  return <div ref={streetViewRef} className={layoutClassSv} />;
}
