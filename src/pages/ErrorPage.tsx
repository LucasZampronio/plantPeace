import { useNavigate } from "react-router-dom";
import React from "react";
import { Helmet } from 'react-helmet';

import logo from "../images/404logo.png";
import bgImage from "../images/forest-bg.png";

export const ErrorPage = () => {
  const navigate = useNavigate();

  const getRandomPosition = () => ({
    left: `${Math.random() * 90}%`,
    top: `${Math.random() * 80}%`,
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white overflow-hidden">
      {/* Partículas de poeira/flor voando */}
      <Helmet>
        <title>404 - plantPeace</title>
      </Helmet>
      <img
        src={bgImage}
        alt=""
        className="absolute bottom-0 left-0 w-full pointer-events-none"
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

      {/* Container principal com efeito vidro */}
      <div className="relative bg-emerald-900/40 border border-emerald-500/30 rounded-xl shadow-xl backdrop-blur-sm p-6 md:p-8 text-center max-w-2xl overflow-hidden">
        {/* Planta com brilho de erro */}
        <div className="relative w-60 h-24 md:w-120 md:h-40 mx-auto mb-0">
          <img
            src={logo}
            className="absolute top-[-70px] md:top-[-140px] z-50 animate-wiggle"
            style={{ transformOrigin: "50% 100%" }}
          />
          <div className="absolute w-10 h-10 top-6 left-14 md:top-12 md:left-28"></div>

          {/* Brilho de energia ao redor da planta */}
          <div className="absolute inset-0 bg-green-100/30 rounded-full blur-xl animate-pulse"></div>
        </div>

        <div className="space-y-4 bg-">
          {/* efeito glitch no título */}
          <h1 className="relative text-4xl font-extrabold text-emerald-100 tracking-wide">
            <span className="relative z-10 text-green-100 animate-glitch font-extrabold bg-gradient-to-r from-emerald-300/10 via-transparent to-emerald-300/10 px-4 py-2 rounded-md shadow-md shadow-emerald-800/20">
              404 - Page not found
            </span>
          </h1>

          <p className="text-xl mt-2 text-green-50">
          It looks like this page has withered... but we have plenty of plants waiting for you!
          🌿
          </p>
        </div>

        {/* Botão estilizado */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-10 py-3 bg-emerald-900 hover:bg-emerald-700 text-white rounded-lg transition-all duration-300 font-semibold text-lg relative overflow-hidden shadow-lg shadow-yellow-400/20 border border-emerald-700"
        >
          <span className="relative z-10">Back to the garden</span>
          <div className="absolute bg-gradient-to-r from-yellow-400/10 to-transparent animate-shine"></div>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;