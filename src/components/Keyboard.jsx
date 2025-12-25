const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export default function Keyboard({ onKeyPress }) {
  return (
    <div className="mt-6 space-y-2">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => {
            const isWide = key === "ENTER" || key === "⌫";

            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`
                    ${isWide ? "px-4" : "w-10"}
                    h-12
                    bg-neutral-700 hover:bg-neutral-600
                    rounded
                    text-sm font-bold
                    flex items-center justify-center
                    select-none
                  `}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
