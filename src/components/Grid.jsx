import { motion as Motion } from "framer-motion";

export default function Grid({
  guesses = [],
  currentGuess = "",
  statuses = [],
}) {
  const rows = 6;
  const cols = 5;

  return (
    <div className="grid gap-2">
      {Array.from({ length: rows }).map((_, rowIndex) => {
        const guess = guesses[rowIndex] || "";
        const isCurrentRow = rowIndex === guesses.length;
        const isSubmittedRow = rowIndex < guesses.length;

        return (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {Array.from({ length: cols }).map((_, colIndex) => {
              const letter =
                isCurrentRow && colIndex < currentGuess.length
                  ? currentGuess[colIndex]
                  : guess[colIndex] || "";

              const status = statuses[rowIndex]?.[colIndex];

              const bgColor =
                status === "correct"
                  ? "bg-emerald-500 border-emerald-500"
                  : status === "present"
                  ? "bg-amber-400 border-amber-400"
                  : status === "absent"
                  ? "bg-slate-400 dark:bg-neutral-600 border-slate-400 dark:border-neutral-600"
                  : "border-stone-300 dark:border-neutral-700 bg-white dark:bg-neutral-800";

              const textColor = status
                ? "text-white"
                : "text-slate-900 dark:text-white";

              if (isSubmittedRow) {
                return (
                  <Motion.div
                    key={colIndex}
                    initial={{
                      rotateX: 0,
                    }}
                    animate={{
                      rotateX: [0, 90, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: colIndex * 0.25,
                      ease: "easeInOut",
                    }}
                    className={`
                      w-14 h-14
                      flex items-center justify-center
                      text-2xl font-bold uppercase
                      border-2
                      rounded
                      shadow-sm
                      transition-colors duration-0
                    `}
                    style={{
                      backgroundColor: status
                        ? status === "correct"
                          ? "#10b981"
                          : status === "present"
                          ? "#fbbf24"
                          : "#94a3b8"
                        : "#ffffff",
                      borderColor: status
                        ? status === "correct"
                          ? "#10b981"
                          : status === "present"
                          ? "#fbbf24"
                          : "#94a3b8"
                        : "#d6d3d1",
                      color: status ? "#ffffff" : "#0f172a",
                      transitionDelay: `${colIndex * 0.25 + 0.4}s`,
                    }}
                  >
                    {letter}
                  </Motion.div>
                );
              }

              return (
                <Motion.div
                  key={colIndex}
                  animate={letter ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.1 }}
                  className={`
                    w-14 h-14
                    flex items-center justify-center
                    text-2xl font-bold uppercase
                    border-2
                    ${bgColor}
                    ${textColor}
                    rounded
                    shadow-sm
                  `}
                >
                  {letter}
                </Motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
