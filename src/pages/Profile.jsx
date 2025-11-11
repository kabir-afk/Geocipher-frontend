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
        // console.log("response : ", response.data);
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
    xp,
    xp_required,
    level,
  } = data ?? {};
  return (
    <div className="bg-custom-gradient min-h-screen font-overpass text-white">
      <div className="w-full md:w-[85%] relative left-1/2 transform -translate-x-1/2 md:top-5 flex flex-col justify-center items-center gap-3 font-bold">
        <div className="absolute z-10 left-1/2 transform -translate-x-1/2  md:left-0 md:translate-x-0 top-1 w-36">
          <img src="geocipher.png" alt="geocipher-logo" />
        </div>
        <Navbar />
      </div>

      <div className="w-full pt-4 px-[7.5%] text-center flex flex-col gap-3">
        <div>
          <div className="flex justify-between p-4">
            <div className="text-left">
              <h1 className="font-bold text-2xl">{username}</h1>
              <p>Joined {date_joined}</p>
            </div>
            <div className="text-right p-2 rounded-md bg-gray-500 h-fit flex gap-2">
              <div className="w-5">
                <img src="/location.png" alt="level-icon" />
              </div>
              <p className="font-bold">Level : {level}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="card">
              <h2>Total Games played</h2> <p>{score.length}</p>
            </div>
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
          {/* Progres bar */}
          <div>
            <div className="flex justify-between py-2">
              <p>Level Progress</p>
              <p>
                {xp}/{xp_required} XP to next level
              </p>
            </div>
            <div className="w-full h-3 rounded-md bg-gray-400">
              <div
                className="h-3 bg-blue-600 rounded-md"
                style={{ width: `${(xp / xp_required) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="h-90 lg:max-h-70  overflow-auto rounded-md scrollbar-hide">
          <table className="w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Rounds</th>
                <th>Distance(km)</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {score.reverse().map((game, gameIdx) => {
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
