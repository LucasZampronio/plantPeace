import { useNavigate } from "react-router-dom";
import logo from "../images/404logo.png"
import bgImage from "../images/forest-bg.png"

export const ErrorPage = () => {
  const navigate = useNavigate();

  const getRandomPosition = () => ({
    left: `${Math.random() * 90}%`,
    top: `${Math.random() * 80}%`,
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white overflow-hidden">
      {/* Partículas de poeira/flor voando */}
      <img
        src={bgImage}
        alt=""
        className="absolute bottom-0 left-0 w-full pointer-events-none"
      />
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-emerald-200 opacity-60 rounded-full blur-[2px] animate-float"
          style={{
            ...getRandomPosition(),
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* container principal com efeito vidro */}
      <div className="relative bg-emerald-900/40 border border-emerald-500/30 rounded-xl shadow-xl backdrop-blur-sm p-8 text-center max-w-2xl  overflow-hidden">
        {/* planta com brilho de erro */}
        <div className="relative w-120 h-40  mx-auto my-auto mb-0">
          <img
            src={logo}
            className="absolute top-[-140px] z-100 animate-wiggle"
            style={{ transformOrigin: "50% 100%" }}
          />
          <div className="absolute w-10 h-10 top-12 left-28"></div>

          {/* brilho de energia ao redor da planta */}
          <div className="absolute inset-0 bg-green-100/30 rounded-full blur-xl animate-pulse"></div>
        </div>

        <div className="space-y-4 bg-">
          {/* efeito glitch no título */}
          <h1 className="relative text-4xl font-extrabold text-green-100 tracking-wide">
            <span className="relative z-10 text-green-100 animate-glitch font-extrabold bg-gradient-to-r from-green-300/10 via-transparent to-green-300/10 px-4 py-2 rounded-md shadow-md shadow-green-400/20">
              404 - Página não encontrada
            </span>
          </h1>

          <p className="text-xl mt-2 text-green-50">
            Parece que essa página murchou...mas temos muitas plantas esperando
            por você🌿
          </p>
        </div>

        {/* botao estilizado */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-10 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 font-semibold text-lg relative overflow-hidden shadow-lg shadow-yellow-400/20 border border-green-300"
        >
          <span className="relative z-10">Voltar ao jardim</span>
          <div className="absolute bg-gradient-to-r from-yellow-400/10 to-transparent animate-shine"></div>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
