import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const dark = savedTheme === "dark";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-card px-3 py-2 rounded-full shadow-lg border border-border transition-all hover:-translate-y-0.5 hover:shadow-xl"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 text-foreground" />
      <div className="relative w-10 h-5 bg-border rounded-full transition-colors">
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-primary-foreground rounded-full shadow transition-transform ${
            isDark ? "translate-x-5 bg-primary" : ""
          }`}
        />
      </div>
      <Moon className="h-4 w-4 text-foreground" />
    </button>
  );
}
