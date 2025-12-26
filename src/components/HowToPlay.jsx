import { Lightbulb } from "lucide-react";

export default function HowToPlay() {
  const examples = [
    {
      word: "WEARY",
      tiles: [
        { letter: "W", status: "correct" },
        { letter: "E", status: "absent" },
        { letter: "A", status: "absent" },
        { letter: "R", status: "absent" },
        { letter: "Y", status: "absent" },
      ],
      explanation: "W is in the word and in the correct spot.",
    },
    {
      word: "PILLS",
      tiles: [
        { letter: "P", status: "absent" },
        { letter: "I", status: "present" },
        { letter: "L", status: "absent" },
        { letter: "L", status: "absent" },
        { letter: "S", status: "absent" },
      ],
      explanation: "I is in the word but in the wrong spot.",
    },
    {
      word: "VAGUE",
      tiles: [
        { letter: "V", status: "absent" },
        { letter: "A", status: "absent" },
        { letter: "G", status: "absent" },
        { letter: "U", status: "absent" },
        { letter: "E", status: "absent" },
      ],
      explanation: "None of these letters are in the word.",
    },
  ];

  return (
    <div className="w-full max-w-lg mt-6 p-6 bg-white dark:bg-neutral-800 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-emerald-500" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          How To Play
        </h2>
      </div>

      <div className="space-y-4 text-sm text-slate-700 dark:text-neutral-300">
        <p className="font-medium">
          Guess the 5-letter word in 6 tries or less!
        </p>

        <div className="space-y-2">
          <p className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
            Rules:
          </p>
          <ul className="space-y-1.5 text-xs">
            <li className="flex gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>Each guess must be a valid 5-letter word</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>Press Enter to submit your guess</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>Tile colors change to show how close you are</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3 pt-2">
          <p className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
            Examples:
          </p>

          {examples.map(({ tiles, explanation }, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex gap-1">
                {tiles.map(({ letter, status }, i) => {
                  const bgColor =
                    status === "correct"
                      ? "bg-emerald-500"
                      : status === "present"
                      ? "bg-amber-400"
                      : "bg-slate-400 dark:bg-neutral-600";

                  return (
                    <div
                      key={i}
                      className={`w-8 h-8 flex items-center justify-center text-white font-bold text-sm ${bgColor} rounded`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-slate-600 dark:text-neutral-400">
                {explanation}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-stone-200 dark:border-neutral-700">
          <p className="font-semibold text-slate-900 dark:text-white mb-2 text-xs uppercase tracking-wide">
            Game Modes:
          </p>
          <div className="space-y-3 text-xs">
            <div className="flex gap-2">
              <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
              <div>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Daily Challenge
                </span>
                <p className="text-slate-600 dark:text-neutral-400 mt-0.5">
                  One unique puzzle per day (resets at midnight UTC). Complete
                  it successfully to unlock Practice Mode for the rest of the
                  day. Your stats are tracked here!
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
              <div>
                <span className="font-semibold text-red-600 dark:text-red-400">
                  Daily Locked
                </span>
                <p className="text-slate-600 dark:text-neutral-400 mt-0.5">
                  If you fail the Daily Challenge (use all 6 guesses), it stays
                  locked until the next day. Come back tomorrow for a fresh
                  challenge!
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
              <div>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Practice Mode
                </span>
                <p className="text-slate-600 dark:text-neutral-400 mt-0.5">
                  Unlocked after completing the Daily Challenge. Play unlimited
                  random words to sharpen your skills. Stats are not tracked in
                  this mode.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-200 dark:border-neutral-700">
          <p className="text-xs text-slate-500 dark:text-neutral-500 italic">
            💡 Tip: Use your first guess to eliminate common letters like E, A,
            R, I, O, T!
          </p>
        </div>
      </div>
    </div>
  );
}
