import { useNavigate } from "react-router-dom";
import logo from "../images/404logo.png"

export const ErrorPage = () => {
  const navigate = useNavigate();

  const getRandomPosition = () => ({
    left: `${Math.random() * 90}%`,
    top: `${Math.random() * 80}%`,
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white overflow-hidden">
      {/* Partículas de poeira/flor voando */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-green-200 opacity-60 rounded-full blur-[2px] animate-float"
          style={{
            ...getRandomPosition(),
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Container principal com efeito vidro */}
      <div className="relative bg-green-800/40 border border-green-500/30 rounded-xl shadow-xl backdrop-blur-md p-8 text-center w-[60%] max-w-2xl">
        {/* Planta com brilho de erro */}
        <div className="relative w-120 h-80 mx-auto mb-2">
          <img
            src={logo}
            className="relative z-10 animate-wiggle"
            style={{ transformOrigin: "50% 100%" }}
          />
          <div className="absolute w-10 h-10 top-12 left-28">
          </div>

          {/* Brilho de energia ao redor da planta */}
          <div className="absolute inset-0 bg-green-400/30 rounded-full blur-xl animate-pulse"></div>
        </div>

        <div className="space-y-4 bg-">
          {/* Efeito glitch no título */}
          <h1 className="relative text-4xl font-extrabold text-green-100 tracking-wide">
            {/* <span className="absolute top-1 left-10 text-red-600 opacity-80 animate-glitch2 z-20">
              404
            </span> */}
            <span className="relative z-10 text-red-600 animate-glitch">404 - Página não encontrada</span>
            <span className="absolute top-0 left-0 w-full h-full bg-green-800 text-green-100 opacity-20 animate-glitch2">404 - Página não encontrada</span>
          </h1>

            <p className="text-xl mt-2 text-green-50">
            Infelizmente a página que você procura murchou... 😢
            </p>
        </div>

        {/* Botão estilizado com efeito de energia */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 font-semibold text-lg relative overflow-hidden shadow-lg shadow-yellow-400/20 border border-green-300"
        >
          <span className="relative z-10">Voltar para o jardim</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent animate-shine"></div>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
