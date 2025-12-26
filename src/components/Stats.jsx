import { Trophy, Target, Flame, TrendingUp } from "lucide-react";

export default function Stats({ stats }) {
  const winRate =
    stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  const statItems = [
    {
      label: "Played",
      value: stats.played,
      icon: Target,
      color: "text-blue-500 dark:text-blue-400",
    },
    {
      label: "Win Rate",
      value: `${winRate}%`,
      icon: TrendingUp,
      color: "text-emerald-500 dark:text-emerald-400",
    },
    {
      label: "Current Streak",
      value: stats.currentStreak,
      icon: Flame,
      color: "text-amber-500 dark:text-amber-400",
    },
    {
      label: "Best Streak",
      value: stats.maxStreak,
      icon: Trophy,
      color: "text-purple-500 dark:text-purple-400",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-neutral-800 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm overflow-hidden">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex items-center justify-between px-4 py-2.5 ${
                index !== statItems.length - 1
                  ? "border-b border-stone-200 dark:border-neutral-700"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-sm font-medium text-slate-700 dark:text-neutral-300">
                  {item.label}
                </span>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-center text-slate-500 dark:text-neutral-400 mt-2">
        Statistics are tracked for Daily Mode only
      </p>
    </div>
  );
}
