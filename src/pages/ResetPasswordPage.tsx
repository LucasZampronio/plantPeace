import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../images/forest-bg.png"; // Mesmo fundo do ForgotPasswordPage

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { signIn } = useSignIn();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!signIn) {
        setError("Erro ao redefinir senha. Tente novamente.");
        return;
      }

      // Confirma o código e redefine a senha
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        setMessage("Senha redefinida com sucesso!");
        setError("");
        setTimeout(() => navigate("/sign-in"), 2000);
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
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Redefinir Senha
        </h2>
        <p className="text-gray-600 text-sm mb-4 text-center">
          Insira o código que enviamos para o seu e-mail e escolha uma nova
          senha.
        </p>
        <form onSubmit={handleResetPassword}>
          <input
            type="text"
            placeholder="Código recebido por e-mail"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Redefinir Senha
          </button>
        </form>
        {message && <p className="text-green-500 text-sm mt-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
