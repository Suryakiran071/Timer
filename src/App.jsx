import { useEffect, useState, useRef } from "react";

function App() {
  const [seconds, setSeconds] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const decreaseTime = () => {
    setSeconds((prev) => Math.max(prev - 2, 0));
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setSeconds(15 * 60);
    setIsRunning(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        toggleTimer();
      } else if (e.key === "s" || e.key === "S") {
        decreaseTime();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [seconds]);

  const formatTime = (secs) => {
    const mins = String(Math.floor(secs / 60)).padStart(2, "0");
    const secsStr = String(secs % 60).padStart(2, "0");
    return `${mins}:${secsStr}`;
  };

  // Blink animation class
  const blinkClass = seconds < 30 && isRunning ? "animate-blink" : "";

  return (
    <div
      className={`h-screen w-full ${
        seconds < 30 && isRunning ? "bg-red-600" : "bg-black"
      } text-white flex flex-col items-center justify-center relative transition-colors duration-500 ${blinkClass}`}
    >
      {/* Restart button when paused or time = 0 */}
      {(!isRunning || seconds === 0) && (
        <button
          onClick={resetTimer}
          className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
        >
          Restart
        </button>
      )}

      {/* "Paused" text */}
      {!isRunning && seconds !== 0 && (
        <div className="text-xl mb-4 text-white">Paused</div>
      )}

      {/* Gradient background and timer */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-96 h-96 rounded-full bg-white opacity-10 blur-3xl"></div>
        <h1 className="text-9xl font-extrabold z-10">{formatTime(seconds)}</h1>
      </div>

      <p className="mt-6 text-gray-400">[Space] Start/Pause | [S] -2s</p>
    </div>
  );
}

export default App;
