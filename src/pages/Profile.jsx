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
    avg_score,
    max_score,
    min_distance,
    score = [],
  } = data ?? {};
  return (
    <div>
      <Navbar />
      <div>{username}</div>
      <div>Avg Score : {avg_score}</div>
      <div>Max Score :{max_score}</div>
      <div>Min Distance :{min_distance}</div>
      <div className="h-60 overflow-auto border-2 border-amber-600">
        <table>
          <thead>
            <tr>
              <th>Game</th>
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
                  {roundIdx === 0 && (
                    <td rowSpan={rounds.length}>{gameIdx + 1}</td>
                  )}
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
  );
};

export default Profile;
