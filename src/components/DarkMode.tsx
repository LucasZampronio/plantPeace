import { useEffect, useState } from "react";

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
    <div className="flex">
      <button
        onClick={toggleDarkMode}
        className="p-4 rounded-full transition-colors duration-300 cursor-pointer"
        aria-label={
          isDarkMode ? "Alternar para modo claro" : "Alternar para modo escuro"
        }
      >
        <div className="relative w-6 h-6">
          {/* Ícone do Sol */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute w-6 h-6 transition-all duration-300 text-yellow-600 ${
              isDarkMode ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
            />
          </svg>

          {/* Ícone da Lua */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute w-6 h-6 transition-all duration-300 text-white ${
              isDarkMode ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default DarkMode;
