import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return (
      localStorage.getItem("darkMode") === "true" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="flex py-4 transition-colors duration-300">
      <button
        onClick={toggleDarkMode}
        className={`relative w-20 h-10 rounded-full focus:outline-none transition-all duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-yellow-50"
        }`}
        aria-label={
          isDarkMode ? "Alternar para modo claro" : "Alternar para modo escuro"
        }
      >
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-8 flex justify-center items-center transition-all duration-300 ${
            isDarkMode ? "left-10" : "left-1"
          }`}
        >
          {isDarkMode ? (
            <FaMoon className="text-white text-lg" />
          ) : (
            <FaSun className="text-yellow-500 text-lg" />
          )}
        </div>
      </button>
    </div>
  );
};

export default DarkMode;
