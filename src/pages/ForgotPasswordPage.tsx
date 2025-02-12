import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import bgImage from "../images/forest-bg.png";
import cactoManSad from "../images/cactoSad.png";

import { Link } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

const ForgotPassword = () => {
  const { signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    try {
      if (!signIn) {
        setError("Não foi possível acessar o método de recuperação de senha.");
        return;
      }

      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setMessage(
        "Se este e-mail estiver registrado, você receberá um link para redefinição de senha."
      );
      setError(""); 
    } catch (err) {
      setError(
        "Erro ao solicitar recuperação de senha. Verifique o e-mail e tente novamente."
      );
      console.error(err);
    }
  };

   return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
      }}
    >
      <div className="max-w-md w-full px-4 pt-8">
        <div className="bg-gray-100 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl pt-0">
          <div className="text-center mb-6 ">
          <img
              src={cactoManSad} 
              alt="Password Reset"
              className="mx-auto w-75 h-75 object-contain mb-0"
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-2 font-serif mt-[-30px]">
              Change Password
            </h2>
            <p className="text-gray-500">
              Enter your email to receive the reset link
            </p>
          </div>

          {/* Formulário */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full bg-green-900 hover:bg-green-900 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
            >
              Send Instructions
            </button>
          </div>

          {/* Mensagens e Links */}
          {message && (
            <div className="mt-6 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm">{message}</span>
            </div>
          )}

          {error && (
            <div className="mt-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link 
              to="/reset-password" 
              className="text-green-900 hover:text-green-900 text-sm font-medium transition-colors underline"
            >
              Already have a code? Reset your password →
            </Link>
          </div>
        </div>

        {/* Link de voltar para login */}
        <div className="text-center mt-6">
          <Link 
            to="/login" 
            className="text-emerald-500 hover:text-emerald-700 text-sm transition-colors"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;