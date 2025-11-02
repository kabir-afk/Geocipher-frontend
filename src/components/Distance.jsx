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
          user_location: to ? to : { lat: 0, lng: 0 },
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
    <div className="*:p-2 *:rounded-2xl flex flex-col justify-center items-center gap-2">
      <div className="w-fit bg-amber-300 text-black">
        {" "}
        Your Score is {score}
      </div>
      <div className=" bg-purple-600 text-white">
        {distance !== 0 ? (
          <span>Your guess was {distance} KM from the correct location.</span>
        ) : (
          <span>You didnt make any guess.</span>
        )}
      </div>
    </div>
  );
}
