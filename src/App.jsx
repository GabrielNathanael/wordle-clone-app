import { useState, useEffect, useCallback } from "react";

import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import { evaluateGuess } from "./utils/evaluateGuess";

const ANSWER = "APPLE";

function App() {
  const [guesses, setGuesses] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [keyStatuses, setKeyStatuses] = useState({});
  const [gameStatus, setGameStatus] = useState("playing");

  const handleKeyPress = useCallback(
    (key) => {
      if (gameStatus !== "playing") return;

      if (key === "ENTER") {
        if (currentGuess.length !== 5) return;
        if (guesses.length >= 6) return;

        const evaluation = evaluateGuess(currentGuess, ANSWER);
        const nextGuesses = [...guesses, currentGuess];

        setGuesses(nextGuesses);
        setStatuses((prev) => [...prev, evaluation]);

        setKeyStatuses((prev) => {
          const next = { ...prev };
          const priority = { correct: 3, present: 2, absent: 1 };

          for (let i = 0; i < 5; i++) {
            const letter = currentGuess[i];
            const status = evaluation[i];

            if (!next[letter] || priority[status] > priority[next[letter]]) {
              next[letter] = status;
            }
          }
          return next;
        });

        if (currentGuess === ANSWER) {
          setGameStatus("won");
          setCurrentGuess("");
          return;
        }

        if (nextGuesses.length === 6) {
          setGameStatus("lost");
          setCurrentGuess("");
          return;
        }

        setCurrentGuess("");
        return;
      }

      // ⌫ BACKSPACE
      if (key === "⌫") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      // 🔤 INPUT HURUF
      if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [currentGuess, guesses, gameStatus]
  );

  // ⌨️ KEYBOARD FISIK
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStatus !== "playing") return;

      const key = e.key.toUpperCase();

      if (key === "ENTER") {
        handleKeyPress("ENTER");
        return;
      }

      if (key === "BACKSPACE") {
        handleKeyPress("⌫");
        return;
      }

      if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyPress, gameStatus]);

  return (
    <div className="w-full h-full bg-neutral-900 text-white flex flex-col items-center pt-10">
      <h1 className="text-4xl font-bold text-green-400 mb-6">Wordle</h1>

      <Grid guesses={guesses} currentGuess={currentGuess} statuses={statuses} />

      {gameStatus === "won" && (
        <p className="mt-4 text-green-400 font-bold text-lg">🎉 You Win!</p>
      )}

      {gameStatus === "lost" && (
        <p className="mt-4 text-red-400 font-bold text-lg">
          😵 You Lose! Word was <span className="underline">{ANSWER}</span>
        </p>
      )}

      <Keyboard onKeyPress={handleKeyPress} keyStatuses={keyStatuses} />
    </div>
  );
}

export default App;
