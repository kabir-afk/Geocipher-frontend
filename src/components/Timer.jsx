import { useEffect, useState } from "react";

export function Timer({ timerState, onTimeFinish }) {
  const time = 120;
  const [timeLeft, setTimeLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(true);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  function resetTimer() {
    setTimeLeft(time);
    setIsRunning(true);
  }
  useEffect(() => {
    let timerId;
    if (isRunning && timerState && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (!isRunning || !timerState) {
      resetTimer();
    }
    if (timeLeft === 0) {
      onTimeFinish();
    }

    return () => clearInterval(timerId);
  }, [isRunning, timerState, onTimeFinish, timeLeft]);

  return (
    <div className="w-25 text-center absolute z-10 top-20 left-1/2 transform -translate-x-1/2 bg-black opacity-55 backdrop-blur-3xl p-2 text-white border-4 border-purple-600 rounded-3xl">
      {formatTime(timeLeft)}
    </div>
  );
}
