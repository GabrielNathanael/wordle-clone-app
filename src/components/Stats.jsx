import { Trophy, Target, Flame, TrendingUp } from "lucide-react";

export default function Stats({ stats }) {
  const winRate =
    stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  const statItems = [
    { label: "Played", value: stats.played, icon: Target },
    { label: "Win %", value: winRate, icon: TrendingUp },
    { label: "Streak", value: stats.currentStreak, icon: Flame },
    { label: "Max", value: stats.maxStreak, icon: Trophy },
  ];

  return (
    <div className="w-full max-w-sm mx-auto bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm px-6 py-4 rounded-2xl border border-stone-200/60 dark:border-neutral-800/60 shadow-sm">
      <div className="flex justify-between items-center gap-4">
        {statItems.map((item) => {
          return (
            <div key={item.label} className="flex flex-col items-center flex-1">
              <div className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                {item.value}
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500 tracking-wider">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
