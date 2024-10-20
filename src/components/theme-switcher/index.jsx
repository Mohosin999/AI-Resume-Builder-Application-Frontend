import React, { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system"
  );
  const [darkColor, setDarkColor] = useState({
    bg: "#1e3a8a", // default background color
    text: "#ffffff", // default text color
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Apply the selected theme
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else if (theme === "system") {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      if (darkModeMediaQuery.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }

    // Apply the dark mode colors
    document.documentElement.style.setProperty("--dark-bg-color", darkColor.bg);
    document.documentElement.style.setProperty(
      "--dark-text-color",
      darkColor.text
    );

    localStorage.setItem("theme", theme);
  }, [theme, darkColor]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const changeDarkColor = (bgColor, textColor) => {
    setDarkColor({ bg: bgColor, text: textColor });
  };

  return (
    <div className="p-4">
      {/* Theme buttons */}
      <button
        onClick={() => toggleTheme("light")}
        className="px-4 py-2 mr-2 border rounded"
      >
        Light Mode
      </button>
      <button
        onClick={() => toggleTheme("dark")}
        className="px-4 py-2 mr-2 border rounded"
      >
        Dark Mode
      </button>
      <button
        onClick={() => toggleTheme("system")}
        className="px-4 py-2 border rounded"
      >
        System Mode
      </button>
    </div>
  );
};

export default ThemeSwitcher;
