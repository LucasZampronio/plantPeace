import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../images/forest-bg.png";
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
        setError("Error resetting password. Please try again.");
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
        setError("Error resetting password.");
      }
    } catch (error: unknown) {
      setError("Invalid or expired code.");
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
      <div className="max-w-md w-full px-4">
        <div className="bg-gray-100 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
          {/* Cabeçalho */}
          <div className="text-center mb-6">
            <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 font-serif">
              New Password
            </h2>
            <p className="text-gray-500">Enter the code and your new password</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleResetPassword} className="space-y-6">
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
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
            >
              Reset Password
            </button>
          </form>

          {/* Mensagens */}
          {message && (
            <div className="mt-6 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
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
              className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
            >
              Didn't receive the code? Resend
            </Link>
          </div>
        </div>

        {/* Link de voltar para login */}
        <div className="text-center mt-6">
          <Link
            to="/sign-in"
            className="text-green-500 hover:text-green-700 text-sm transition-colors"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
