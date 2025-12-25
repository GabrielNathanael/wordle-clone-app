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

        return (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {Array.from({ length: cols }).map((_, colIndex) => {
              const letter =
                isCurrentRow && colIndex < currentGuess.length
                  ? currentGuess[colIndex]
                  : guess[colIndex] || "";

              const status = statuses[rowIndex]?.[colIndex];

              const bg =
                status === "correct"
                  ? "bg-green-600 border-green-600"
                  : status === "present"
                  ? "bg-yellow-500 border-yellow-500"
                  : status === "absent"
                  ? "bg-neutral-700 border-neutral-700"
                  : "border-neutral-700";

              return (
                <div
                  key={colIndex}
                  className={`
                      w-14 h-14
                      flex items-center justify-center
                      text-2xl font-bold uppercase
                      border-2
                      ${bg}
                    `}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
