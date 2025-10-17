import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosinstance";

export function Distance({ from, to, round }) {
  const [distance, setDistance] = useState(null);
  const [score, setScore] = useState(null);
  const geometryLibrary = useMapsLibrary("geometry");

  useEffect(() => {
    if (!geometryLibrary) return;

    let dist = geometryLibrary.spherical.computeDistanceBetween(
      { lat: from.lat, lng: from.lng },
      { lat: to.lat, lng: to.lng }
    );
    setDistance(dist);
    dist = Math.round(dist / 1000);
    async function fetchScore(from, to, round) {
      try {
        const response = await axiosInstance.post("/api/v1/score", {
          round: round,
          user_location: to,
          actual_location: { lat: from.lat, lng: from.lng },
          distance: dist,
        });
        setScore(response.data.score);
      } catch (error) {
        console.error("Error creating post:", error.message);
      }
    }
    fetchScore(from, to, round);
  }, [geometryLibrary, from, to, round]);

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-fit flex flex-col items-center justify-center">
      <div className="w-fit bg-amber-300 text-black p-2 rounded-2xl">
        {" "}
        Your Score is {score}
      </div>
      <div className=" bg-purple-600 text-white mt-2 p-2 rounded-2xl">
        Your guess was{" "}
        {distance >= 1000
          ? `${Math.round(distance / 1000)} KM`
          : `${Math.round(distance)} meters`}{" "}
        from the correct location.
      </div>
    </div>
  );
}
