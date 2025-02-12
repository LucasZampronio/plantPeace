import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../images/forest-bg.png";
import cactoMan from "../images/cactoManDefault.png";
import { LockClosedIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react"; 

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { signIn } = useSignIn();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message] = useState("");
  const [error, setError] = useState("");
  const { signOut } = useAuth();

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!signIn) {
        setError("Erro ao redefinir senha. Tente novamente.");
        return;
      }

      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        await signOut();
        navigate("/sign-in?reset=success");
        window.location.reload();
      } else {
        setError("Erro ao redefinir senha.");
      }
    } catch (error: unknown) {
      setError("Código inválido ou expirado.");
      console.error("Erro ao redefinir senha:", error);
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
        <div className=" pt-0 bg-gray-100 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
          {/* Cabeçalho */}
          <div className="text-center pt-0">
            
            <img
              src={cactoMan} 
              alt="Password Reset"
              className="mx-auto w-75 h-75 object-contain mb-0"
            />

            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif mt-[-50px]">
              New Password
            </h2>
            <p className="text-gray-500 mb-4">Enter the code and your new password</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleResetPassword} className="space-y-6 ">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <div className="relative">
                <KeyIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Code received by email"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-900 hover:bg-green-900 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.01]"
            >
              Reset Password
            </button>
          </form>

          {/* Mensagens */}
          {message && (
            <div className="mt-6 p-3 bg-green-50 text-green-900 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{message}</span>
            </div>
          )}

          {error && (
            <div className="mt-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
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

          {/* Links */}
          <div className="mt-6 text-center">
            <Link
              to="/forgot-password"
              className="text-green-900 hover:text-green-800 text-sm font-medium transition-colors underline"
            >
              Didn't receive the code? Resend
            </Link>
          </div>
        </div>

        {/* Link de voltar para login */}
        <div className="text-center mt-6">
          <Link
            to="/sign-in"
            className="text-green-500 hover:text-green-900 text-sm transition-colors"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
