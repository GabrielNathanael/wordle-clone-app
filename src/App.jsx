// ==================== App.jsx ====================
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import toast from "react-hot-toast";

import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Stats from "./components/Stats";
import ShareButton from "./components/ShareButton";
import CountdownTimer from "./components/CountdownTimer";
import HowToPlay from "./components/HowToPlay";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { evaluateGuess } from "./utils/evaluateGuess";

import WORDS from "./data/words.json";

/* ============================= Helpers ============================= */
function getUTCDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function hashString(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickDailyWord(words, todayKey) {
  const h = hashString(todayKey);
  const index = h % words.length;
  return words[index];
}

function pickRandomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

function dailyCompletedKey(todayKey) {
  return `wordle:daily:completed:${todayKey}`;
}

function dailyFailedKey(todayKey) {
  return `wordle:daily:failed:${todayKey}`;
}

function dailyResultKey(todayKey) {
  return `wordle:daily:result:${todayKey}`;
}

/* ============================= Stats Helpers ============================= */
function getStats() {
  const saved = localStorage.getItem("wordle:stats");
  return saved
    ? JSON.parse(saved)
    : { played: 0, won: 0, currentStreak: 0, maxStreak: 0 };
}

function saveStats(stats) {
  localStorage.setItem("wordle:stats", JSON.stringify(stats));
}

function updateStatsOnWin(stats) {
  const newStats = {
    played: stats.played + 1,
    won: stats.won + 1,
    currentStreak: stats.currentStreak + 1,
    maxStreak: Math.max(stats.maxStreak, stats.currentStreak + 1),
  };
  saveStats(newStats);
  return newStats;
}

function updateStatsOnLoss(stats) {
  const newStats = {
    played: stats.played + 1,
    won: stats.won,
    currentStreak: 0,
    maxStreak: stats.maxStreak,
  };
  saveStats(newStats);
  return newStats;
}

/* ============================= App ============================= */
export default function App() {
  const WORD_SET = useMemo(() => new Set(WORDS), []);

  const [todayKey, setTodayKey] = useState(() => getUTCDateKey());
  const [stats, setStats] = useState(getStats);

  // State untuk trigger re-render pas localStorage berubah
  const [dailyStatusTrigger, setDailyStatusTrigger] = useState(0);

  const dailyCompleted = useMemo(
    () => localStorage.getItem(dailyCompletedKey(todayKey)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todayKey, dailyStatusTrigger]
  );

  const dailyFailed = useMemo(
    () => localStorage.getItem(dailyFailedKey(todayKey)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todayKey, dailyStatusTrigger]
  );

  const mode = dailyFailed
    ? "daily-locked"
    : dailyCompleted
    ? "practice"
    : "daily";

  const dailyAnswer = useMemo(() => pickDailyWord(WORDS, todayKey), [todayKey]);

  const [answer, setAnswer] = useState(() =>
    dailyCompleted ? pickRandomWord(WORDS) : dailyAnswer
  );

  const [guesses, setGuesses] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [keyStatuses, setKeyStatuses] = useState({});
  const [gameStatus, setGameStatus] = useState(
    dailyFailed ? "locked" : "playing"
  );
  const [shake, setShake] = useState(false);
  const [showPracticeButton, setShowPracticeButton] = useState(false);
  const [showNextWordButton, setShowNextWordButton] = useState(false);
  const [viewingDailyResult, setViewingDailyResult] = useState(false);
  const [isPlayingPractice, setIsPlayingPractice] = useState(false);

  /* ============================= Reset ============================= */
  const resetBoard = useCallback(() => {
    setGuesses([]);
    setStatuses([]);
    setCurrentGuess("");
    setKeyStatuses({});
    setGameStatus("playing");
    setShowNextWordButton(false);
  }, []);

  const startPractice = useCallback(() => {
    window.location.reload();
  }, []);

  const nextWord = useCallback(() => {
    resetBoard();
    setAnswer(pickRandomWord(WORDS));
    setIsPlayingPractice(true); // ← Maintain flag
  }, [resetBoard]);

  const viewDailyResult = useCallback(() => {
    const savedResult = localStorage.getItem(dailyResultKey(todayKey));
    if (savedResult) {
      const { guesses: dailyGuesses, statuses: dailyStatuses } =
        JSON.parse(savedResult);

      // Reset board state
      setGuesses(dailyGuesses);
      setStatuses(dailyStatuses);
      setAnswer(dailyAnswer);
      setCurrentGuess("");
      setKeyStatuses({});
      setGameStatus("viewing");
      setViewingDailyResult(true);
      setShowPracticeButton(false);
      setShowNextWordButton(false);
      setIsPlayingPractice(false);
    }
  }, [todayKey, dailyAnswer]);

  /* ============================= Key Handler ============================= */
  const handleKeyPress = useCallback(
    (key) => {
      if (gameStatus !== "playing") return;

      if (key === "ENTER") {
        if (currentGuess.length !== 5) return;
        if (guesses.length >= 6) return;

        if (!WORD_SET.has(currentGuess)) {
          setShake(true);
          setTimeout(() => setShake(false), 500);
          toast.error("Word not found");
          return;
        }

        const evaluation = evaluateGuess(currentGuess, answer);
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

        /* WIN */
        if (currentGuess === answer) {
          setCurrentGuess("");

          setGameStatus("won");

          if (mode === "daily" && !isPlayingPractice) {
            setStats((prev) => updateStatsOnWin(prev));
            localStorage.setItem(dailyCompletedKey(todayKey), "1");

            const nextStatuses = [...statuses, evaluation];
            localStorage.setItem(
              dailyResultKey(todayKey),
              JSON.stringify({ guesses: nextGuesses, statuses: nextStatuses })
            );

            setDailyStatusTrigger((prev) => prev + 1);

            toast.success("Brilliant! Practice mode unlocked");
            setShowPracticeButton(true);
            return;
          }

          // Practice mode win
          toast.success("Correct!");
          setShowNextWordButton(true);
          return;
        }

        /* LOSE */
        if (nextGuesses.length === 6) {
          setCurrentGuess("");

          if (mode === "daily" && !isPlayingPractice) {
            setStats((prev) => updateStatsOnLoss(prev));
            localStorage.setItem(dailyFailedKey(todayKey), "1");

            const nextStatuses = [...statuses, evaluation];
            localStorage.setItem(
              dailyResultKey(todayKey),
              JSON.stringify({ guesses: nextGuesses, statuses: nextStatuses })
            );

            setDailyStatusTrigger((prev) => prev + 1);

            setGameStatus("locked");
            toast.error(
              `The word was ${answer.toUpperCase()}. See you tomorrow!`,
              {
                duration: 5000,
              }
            );
            return;
          }

          setGameStatus("lost");
          toast.error(`The word was ${answer.toUpperCase()}`, {
            duration: 5000,
          });
          setShowNextWordButton(true);
          return;
        }

        setCurrentGuess("");
        return;
      }

      if (key === "⌫") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [
      WORD_SET,
      answer,
      currentGuess,
      guesses,
      statuses,
      gameStatus,
      mode,
      todayKey,
      isPlayingPractice,
    ]
  );

  /* ============================= Physical Keyboard ============================= */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (gameStatus !== "playing") return;

      if (e.key === "Enter") return handleKeyPress("ENTER");
      if (e.key === "Backspace") return handleKeyPress("⌫");

      const k = e.key.toUpperCase();
      if (/^[A-Z]$/.test(k)) handleKeyPress(k);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKeyPress, gameStatus]);

  /* ============================= UTC Midnight Watcher ============================= */
  useEffect(() => {
    const id = setInterval(() => {
      const tk = getUTCDateKey();
      if (tk !== todayKey) {
        setTodayKey(tk);
        setGuesses([]);
        setStatuses([]);
        setCurrentGuess("");
        setKeyStatuses({});
        setGameStatus("playing");
        setShowNextWordButton(false);
        setShowPracticeButton(false);
        setViewingDailyResult(false);
        setAnswer(pickDailyWord(WORDS, tk));
      }
    }, 30_000);

    return () => clearInterval(id);
  }, [todayKey]);

  /* ============================= New Day Handler ============================= */
  const lastToastMode = useRef(null);
  useEffect(() => {
    if (lastToastMode.current === mode) return;
    lastToastMode.current = mode;

    if (mode === "daily") {
      toast("Ready for today's challenge?", { icon: "🗓️" });
    }

    if (mode === "practice") {
      toast("Practice mode active!", { icon: "🎮" });
    }

    if (mode === "daily-locked") {
      toast("See you tomorrow for a new word!", { icon: "🔒" });
    }
  }, [mode]);

  /* ============================= UI ============================= */
  const actualMode = isPlayingPractice ? "practice" : mode;

  const subtitle =
    actualMode === "daily"
      ? `Daily Challenge`
      : actualMode === "daily-locked"
      ? `Daily Locked`
      : "Practice Mode";

  const modeBadgeColor =
    actualMode === "daily"
      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
      : actualMode === "daily-locked"
      ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700"
      : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700";

  const isWon = gameStatus === "won";
  const hasDailyResult = localStorage.getItem(dailyResultKey(todayKey));

  return (
    <div className="min-h-screen w-full bg-stone-50 dark:bg-neutral-950 text-slate-900 dark:text-white flex flex-col items-center px-4 pt-24 pb-8 transition-colors overflow-x-hidden">
      <Navbar />
      {/* Header */}
      <div className="w-full max-w-lg flex flex-col mb-6 gap-2">
        <div className="relative flex items-center justify-center w-full">
          <img
            src="/logo.png"
            alt="Wordply"
            className="h-10 w-auto object-contain"
          />
        </div>
        <div className="flex justify-center gap-2 items-center flex-wrap mt-2">
          <span
            className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-all duration-300 ${modeBadgeColor}`}
          >
            {subtitle}
          </span>

          {mode === "practice" && hasDailyResult && !viewingDailyResult && (
            <button
              onClick={viewDailyResult}
              className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all"
            >
              View Daily Result
            </button>
          )}
          {viewingDailyResult && (
            <button
              onClick={startPractice}
              className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
            >
              Back to Practice
            </button>
          )}
        </div>
      </div>

      {/* Countdown Timer (only when locked) */}
      {mode === "daily-locked" && (
        <div className="mb-4">
          <CountdownTimer />
        </div>
      )}

      {/* Grid */}
      <div className={shake ? "animate-shake" : ""}>
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          statuses={statuses}
        />
      </div>

      {/* Feedback & Status Area */}
      <div className="flex flex-col items-center justify-center my-4 gap-3 w-full">
        {gameStatus === "lost" && mode === "practice" && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-red-500 font-bold">
              The word was: {answer.toUpperCase()}
            </p>
            <button
              onClick={nextWord}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-sm transition-all shadow-md active:scale-95"
            >
              Next Word
            </button>
          </div>
        )}

        {gameStatus === "locked" && (
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-neutral-400">
              The word was:{" "}
              <span className="font-bold">{answer.toUpperCase()}</span>
            </p>
          </div>
        )}

        {/* Share Button + Practice/Next Button */}
        {isWon && !viewingDailyResult && (
          <div className="flex flex-col items-center gap-2">
            <ShareButton
              statuses={statuses}
              todayKey={todayKey}
              attempts={guesses.length}
            />
            {showPracticeButton && (
              <button
                onClick={startPractice}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold text-sm transition-all shadow-md active:scale-95"
              >
                Start Practice Mode
              </button>
            )}
            {showNextWordButton && (
              <button
                onClick={nextWord}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-sm transition-all shadow-md active:scale-95"
              >
                Next Word
              </button>
            )}
          </div>
        )}

        {/* Viewing Daily Result */}
        {viewingDailyResult && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-slate-600 dark:text-neutral-400">
              Your daily result
            </p>
            <ShareButton
              statuses={statuses}
              todayKey={todayKey}
              attempts={guesses.length}
            />
          </div>
        )}
      </div>

      {/* Keyboard Area */}
      {!viewingDailyResult && gameStatus === "playing" && (
        <div className="flex justify-center pb-8 w-full">
          <Keyboard onKeyPress={handleKeyPress} keyStatuses={keyStatuses} />
        </div>
      )}

      {/* Stats */}
      <div className="mb-2 mt-6">
        <Stats stats={stats} />
      </div>

      {/* How to Play */}
      <HowToPlay />

      {/* Footer */}
      <Footer />
    </div>
  );
}
