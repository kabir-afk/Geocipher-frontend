import { useEffect, useState } from "react";
import axiosInstance from "../axiosinstance";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchPtotectedData = async () => {
      try {
        const response = await axiosInstance.get("api/v1/protected-view/");
        setData(response.data);
        console.log("response : ", response.data);
      } catch (error) {
        console.error("Error fetching data : ", error.response.data.detail);
      }
    };
    fetchPtotectedData();
  }, []);
  const {
    username,
    date_joined,
    avg_score,
    max_score,
    min_distance,
    score = [],
  } = data ?? {};
  return (
    <div className="bg-custom-gradient min-h-screen font-overpass text-white">
      <div className="w-full relative left-1/2 transform -translate-x-1/2 top-5 flex flex-col justify-center items-center gap-3 font-bold">
        <Navbar />
      </div>

      <div className="w-[80%] relative top-10 left-1/2 transform -translate-x-1/2 text-center flex flex-col gap-3">
        <div className="border-2 border-amber-950">
          <h1>{username}</h1>
          <p>Joined {date_joined}</p>
          <div className="flex justify-between gap-4">
            <div className="card">
              <h2>Max Score</h2> <p>{max_score}</p>
            </div>
            <div className="card">
              <h2>Avg Score</h2> <p>{avg_score}</p>
            </div>
            <div className="card">
              <h2>Min Distance</h2> <p>{min_distance} KM</p>
            </div>
          </div>
        </div>
        <div className="h-auto overflow-auto border-2 rounded-md">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Rounds</th>
                <th>Distance(km)</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {score.map((game, gameIdx) => {
                const rounds = game.rounds ?? [];
                return rounds.map((round, roundIdx) => (
                  <tr key={`${gameIdx}-${roundIdx}`}>
                    {/* {roundIdx === 0 && (
                      <td rowSpan={rounds.length}>{gameIdx + 1}</td>
                    )} */}
                    <td>{round.date ?? "-"}</td>
                    <td>{round.round ?? roundIdx + 1}</td>
                    <td>{round.distance ?? "-"}</td>
                    <td>{round.score ?? "-"}</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
