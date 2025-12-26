// ==================== Keyboard.jsx ====================
import { Delete } from "lucide-react";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export default function Keyboard({ onKeyPress, keyStatuses = {} }) {
  return (
    <div className="mt-6 space-y-1.5 sm:space-y-2 w-full max-w-lg px-1">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-0.5 sm:gap-1">
          {row.map((key) => {
            const isWide = key === "ENTER" || key === "⌫";
            const status = keyStatuses[key];

            const bgColor =
              status === "correct"
                ? "bg-emerald-500 hover:bg-emerald-600"
                : status === "present"
                ? "bg-amber-400 hover:bg-amber-500"
                : status === "absent"
                ? "bg-slate-400 dark:bg-neutral-600 hover:bg-slate-500 dark:hover:bg-neutral-500"
                : "bg-stone-200 dark:bg-neutral-700 hover:bg-stone-300 dark:hover:bg-neutral-600";

            const textColor = status
              ? "text-white"
              : "text-slate-900 dark:text-white";

            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`
                  ${
                    isWide ? "px-2 sm:px-4 min-w-10 sm:min-w-15" : "w-7 sm:w-10"
                  }
                  h-12 sm:h-14
                  ${bgColor}
                  ${textColor}
                  rounded-md sm:rounded-lg
                  text-xs sm:text-sm font-bold
                  flex items-center justify-center
                  select-none
                  transition-all
                  active:scale-95
                  shadow-sm
                `}
              >
                {key === "⌫" ? (
                  <Delete className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
