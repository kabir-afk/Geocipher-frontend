import { useMapsLibrary } from "@vis.gl/react-google-maps";
import axios from "axios";
import { useEffect, useState } from "react";

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
    async function fetchScore(from, to) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/score",
          {
            round: round,
            user_location: to,
            actual_location: { lat: from.lat, lng: from.lng },
            distance: dist,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Post created successfully:", response.data);
        return response.data.score;
      } catch (error) {
        console.error("Error creating post:", error.message);
      }
    }
    fetchScore(from, to, round).then((score) => setScore(score));
  }, [geometryLibrary, from, to, round]);

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-fit bg-purple-600 text-white p-2 rounded-2xl text-center">
      Your guess was{" "}
      {distance >= 1000
        ? `${Math.round(distance / 1000)} KM`
        : `${Math.round(distance)} meters`}{" "}
      from the correct location. Your Score is {score}
    </div>
  );
}
