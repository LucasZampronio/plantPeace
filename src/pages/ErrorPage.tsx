import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

import logo from "../images/404logoNew.png";
import bgImage from "../images/forest-bg.png";

import CustomCursor from "../components/CustomCursor";

export const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.cursor = "none"; // Remove o cursor padrão

    return () => {
      document.body.style.cursor = "auto"; // Restaura o cursor ao sair da página
    };
  }, []);

  const getRandomPosition = () => ({
    left: `${Math.random() * 90}%`,
    top: `${Math.random() * 80}%`,
  });

  return (
    <div className="relative min-h-screen flex items-center pt-30 justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white overflow-hidden px-4 sm:px-6 md:px-10">
      <Helmet>
        <title>404 - plantPeace</title>
      </Helmet>

      <CustomCursor />

      <img
        src={bgImage}
        alt="Background"
        className="absolute bottom-0 left-0 w-full object-cover h-full pointer-events-none"
      />
      
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-emerald-800 opacity-60 rounded-full blur-[2px] animate-float"
          style={{
            ...getRandomPosition(),
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      <div className="relative bg-emerald-900/40 border border-emerald-500/30 rounded-xl shadow-xl backdrop-blur-sm p-6 md:p-8 text-center max-w-2xl w-full sm:w-3/4 lg:w-1/2 overflow-hidden">
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="PlantPeace Logo"
            className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-100 tracking-wide">
          <span className="relative z-10 text-green-100 animate-glitch font-extrabold bg-gradient-to-r from-emerald-300/10 via-transparent to-emerald-300/10 px-4 py-2 rounded-md shadow-md shadow-emerald-800/20">
            404 - Page not found
          </span>
        </h1>

        <p className="text-lg sm:text-xl mt-2 text-green-50">
          It looks like this page has withered... but we have plenty of plants waiting for you! 🌿
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 sm:px-8 py-3 bg-emerald-900 hover:bg-emerald-700 text-white rounded-lg transition-all duration-300 font-semibold text-lg relative overflow-hidden shadow-lg shadow-yellow-400/20 border border-emerald-700 cursor-pointer"
        >
          <span className="relative z-10">Back to the garden</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent animate-shine"></div>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
