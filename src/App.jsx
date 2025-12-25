import { useState } from "react";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";

import { evaluateGuess } from "./utils/evaluateGuess";

const ANSWER = "APPLE";

function App() {
  const [guesses, setGuesses] = useState([]);
  const [statuses, setStatuses] = useState([]); // ⬅️ BARU
  const [currentGuess, setCurrentGuess] = useState("");

  const handleKeyPress = (key) => {
    // SUBMIT
    if (key === "ENTER") {
      if (currentGuess.length !== 5) return;
      if (guesses.length >= 6) return;

      const evaluation = evaluateGuess(currentGuess, ANSWER);

      setGuesses((prev) => [...prev, currentGuess]);
      setStatuses((prev) => [...prev, evaluation]);
      setCurrentGuess("");
      return;
    }

    // BACKSPACE
    if (key === "⌫") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    // INPUT HURUF
    if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  return (
    <div className="w-full h-full bg-neutral-900 text-white flex flex-col items-center pt-10">
      <h1 className="text-4xl font-bold text-green-400 mb-6">Wordle</h1>

      <Grid guesses={guesses} currentGuess={currentGuess} statuses={statuses} />

      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;
