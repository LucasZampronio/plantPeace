import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import bgImage from "../images/forest-bg.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { signIn } = useSignIn(); // Hook do Clerk para autenticação
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    try {
      if (!signIn) {
        setError("Não foi possível acessar o método de recuperação de senha.");
        return;
      }

      // Solicita a recuperação de senha para o e-mail informado
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setMessage(
        "Se este e-mail estiver registrado, você receberá um link para redefinição de senha."
      );
      setError(""); // Limpa erros caso existam
    } catch (err) {
      setError(
        "Erro ao solicitar recuperação de senha. Verifique o e-mail e tente novamente."
      );
      console.error(err);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-opacity-50">
        <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Recuperar Senha
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Digite seu e-mail e enviaremos um código para redefinir sua senha.
          </p>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />
          <button
            onClick={handleResetPassword}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Enviar Código
          </button>
          {message && <p className="text-green-500 text-sm mt-4">{message}</p>}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          <p className="text-sm text-blue-500 hover:underline mt-4 text-center">
            <Link to="/reset-password">Já recebeu seu código?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;