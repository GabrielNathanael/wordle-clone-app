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
        <p>Guess the Wordle in 6 tries.</p>

        <ul className="space-y-2 list-disc list-inside">
          <li>Each guess must be a valid 5-letter word.</li>
          <li>
            The color of the tiles will change to show how close your guess was.
          </li>
        </ul>

        <div className="space-y-3 pt-2">
          <p className="font-semibold text-slate-900 dark:text-white">
            Examples:
          </p>

          {examples.map(({ tiles, explanation }, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex gap-1">
                {tiles.map(({ letter, status }, i) => {
                  const bgColor =
                    status === "correct"
                      ? "bg-emerald-500"
                      : status === "present"
                      ? "bg-amber-400"
                      : "bg-slate-300 dark:bg-neutral-600";

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
              <p className="text-xs">{explanation}</p>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-stone-200 dark:border-neutral-700">
          <p className="font-semibold text-slate-900 dark:text-white mb-1">
            Game Modes:
          </p>
          <ul className="space-y-1 text-xs">
            <li>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                Daily Mode:
              </span>{" "}
              One puzzle per day. Solve it to unlock endless Practice Mode!
            </li>
            <li>
              <span className="font-medium text-amber-600 dark:text-amber-400">
                Challenge:
              </span>{" "}
              If you fail the Daily Challenge, it stays locked until tomorrow.
            </li>
            <li>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                Practice Mode:
              </span>{" "}
              Unlimited random words to sharpen your skills.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
