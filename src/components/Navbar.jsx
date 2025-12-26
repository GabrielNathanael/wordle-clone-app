import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-16 bg-stone-50/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-stone-200 dark:border-neutral-800 transition-colors">
      <div className="flex items-center">
        <h1 className="text-xl font-bold tracking-tight text-black dark:text-white">
          WORDPLY
        </h1>
      </div>
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </nav>
  );
}
