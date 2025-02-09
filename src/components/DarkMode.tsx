import { useEffect, useState } from 'react';

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('darkMode') === 'true' ||
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <button
      onClick={toggleDarkMode}
      className=" text-white bg-emerald-900 px-5 py-3 rounded-xl cursor-pointer hover:bg-emerald-700 transition  dark:bg-emerald-900 dark:text-gray-100"
    >
      {isDarkMode ? 'LightMode' : 'DarkMode'}
    </button>
  );
};

export default DarkMode;
