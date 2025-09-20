import { useEffect, useState } from "react";

export function Timer({ timerState }) {
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRunning, setIsRunning] = useState(true);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  function resetTimer() {
    setTimeLeft(120);
    setIsRunning(true);
  }
  useEffect(() => {
    let timerId;
    if (isRunning && timerState && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (!isRunning || !timerState || timeLeft === 0) {
      resetTimer();
    }

    return () => clearInterval(timerId);
  }, [isRunning, timerState, timeLeft]);

  return (
    <div className="absolute z-10 top-0 left-1/2 transform -translate-x-1/2 bg-yellow-500 p-2">
      {formatTime(timeLeft)}
    </div>
  );
}
