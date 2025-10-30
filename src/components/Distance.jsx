import { useEffect, useRef, useState } from "react";
import axiosInstance from "../axiosinstance";

export function Distance({ from, to, round, gameId }) {
  const [distance, setDistance] = useState(null);
  const [score, setScore] = useState(0);
  const postedRounds = useRef(new Set());
  useEffect(() => {
    if (postedRounds.current.has(round)) return; // ⛔ prevent re-posting
    postedRounds.current.add(round);

    async function fetchScore(from, to, round) {
      try {
        const response = await axiosInstance.post("/api/v1/score", {
          game: gameId,
          round: round,
          user_location: to ? to : 0,
          actual_location: { lat: from.lat, lng: from.lng },
        });
        setScore(response.data.score);
        setDistance(response.data.distance);
      } catch (error) {
        console.error("Error creating post:", error.message);
      }
    }
    fetchScore(from, to, round);
  }, [from, to, round, gameId]);

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-fit flex flex-col items-center justify-center">
      <div className="w-fit bg-amber-300 text-black p-2 rounded-2xl">
        {" "}
        Your Score is {score}
      </div>
      <div className=" bg-purple-600 text-white mt-2 p-2 rounded-2xl">
        {distance !== 0 ? (
          <p>Your guess was {distance} KM from the correct location.</p>
        ) : (
          <p>You didnt make any guess.</p>
        )}
      </div>
    </div>
  );
}
