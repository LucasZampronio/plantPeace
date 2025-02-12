import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import bgImage from "../images/forest-bg.png";
import cactoMan from "../images/cactoManDefault.png";
import { KeyIcon } from "@heroicons/react/24/outline";

const VerifyEmailPage = () => {
  const { emailId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const emailAddress = user?.emailAddresses.find((e) => e.id === emailId);

  useEffect(() => {
    if (!emailAddress || !emailId) {
      navigate("/user/config");
    }
  }, [emailAddress, emailId, navigate]);

  const handleVerify = async () => {
    try {
      if (!emailAddress) return;
      
      await emailAddress.attemptVerification({ code });
      await user?.update({ primaryEmailAddressId: emailAddress.id });

      setIsVerified(true);
      setTimeout(() => navigate("/user/config"), 2000);
    } catch {
      setError("Código inválido ou expirado");
    }
  };

  const handleResendCode = async () => {
  try {
    if (!emailAddress) return;

    await emailAddress.prepareVerification({
      strategy: "email_code"
    });

    setError("");
    alert("Novo código enviado com sucesso!");
  } catch (err) {
    setError("Erro ao reenviar código. Tente novamente mais tarde.");
    console.error("Erro no reenvio:", err);
  }
};

  if (isVerified) {
    return (
      <div
        className="w-full min-h-screen bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
        }}
      >
        <div className="max-w-md w-full px-4">
          <div className="bg-gray-100 rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif">
                Verificação Concluída!
              </h2>
              <div className="mt-6 p-3 bg-green-50 text-green-900 rounded-lg">
                <span className="text-sm">Redirecionando para configurações...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
      }}
    >
      <div className="max-w-md w-full px-4 pt-8">
        <div className="pt-0 bg-gray-100 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
          <div className="text-center pt-0">
            <img
              src={cactoMan}
              alt="Email Verification"
              className="mx-auto w-75 h-75 object-contain mb-0"
            />

            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif mt-[-50px]">
              Verificação de Email
            </h2>
            <p className="text-gray-500 mb-4">
              Digite o código enviado para:{" "}
              <span className="font-semibold text-green-900">
                {emailAddress?.emailAddress}
              </span>
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de Verificação
              </label>
              <div className="relative">
                <KeyIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Código de 6 dígitos"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              onClick={handleVerify}
              className="w-full bg-green-900 hover:bg-green-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.01]"
            >
              Verificar Código
            </button>

            <div className="text-center">
              <Link
                to="#"
                onClick={() => handleResendCode()}
                className="text-green-900 hover:text-green-800 text-sm font-medium transition-colors underline"
              >
                Não recebeu o código? Reenviar
              </Link>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/user/config"
              className="text-green-500 hover:text-green-900 text-sm transition-colors"
            >
              ← Voltar para Configurações
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;