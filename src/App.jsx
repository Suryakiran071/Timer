import { useEffect, useState, useRef } from "react";

function App() {
  const MAX_TIME = 15 * 60; // 15 minutes
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start Timer
  const startTimer = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev < MAX_TIME) {
            return prev + 1;
          } else {
            clearInterval(intervalRef.current);
            return prev;
          }
        });
      }, 1000);
      setIsRunning(true);
    }
  };

  // Pause Timer
  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  // Reset Timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
    setIsRunning(false);
  };

  // Add +5 Seconds
  const addFiveSeconds = () => {
    setSeconds((prev) => Math.min(prev + 5, MAX_TIME));
  };

  // Format as MM:SS
  const formatTime = (secs) => {
    const mins = String(Math.floor(secs / 60)).padStart(2, "0");
    const secsStr = String(secs % 60).padStart(2, "0");
    return `${mins}:${secsStr}`;
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center px-4 py-10 text-center">
      {/* Timer Display */}
      <div className="relative flex items-center justify-center mb-10">
        <div className="absolute w-72 h-72 rounded-full bg-white opacity-10 blur-3xl"></div>
        <h1 className="text-[20vw] sm:text-[15vw] md:text-[10vw] font-extrabold z-10">
          {formatTime(seconds)}
        </h1>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded w-40"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded w-40"
          >
            Pause
          </button>
        )}

        <button
          onClick={addFiveSeconds}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded w-40"
        >
          +5 Seconds
        </button>

        <button
          onClick={resetTimer}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded w-40"
        >
          Restart
        </button>
      </div>

      {/* Footer Note */}
      <p className="mt-6 text-sm text-gray-400">Counts up to 15 minutes.</p>
    </div>
  );
}

export default App;
