import { useEffect, useState } from "react";
import { Sun, Moon } from "./Icons.jsx";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) { /* ignore */ }
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";
  return (
    <button className="icon-btn" onClick={() => setTheme(next)} aria-label={`Switch to ${next} theme`} title={`Switch to ${next} theme`}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
