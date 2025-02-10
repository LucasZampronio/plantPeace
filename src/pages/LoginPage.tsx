import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import { Helmet } from "react-helmet";
import LoginForm from "../components/Login/login";

interface UserData {
  email: string;
  clerkUserId: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { signIn } = useSignIn();

  const saveUserToDB = async (userData: UserData) => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar usuário no banco de dados");
      }

      await response.json();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      throw error;
    }
  };

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      if (!signIn) {
        setError(
          "Não foi possível acessar o método de login. Tente novamente."
        );
        return;
      }

      const signInResponse = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      const userData: UserData = {
        email: data.email,
        clerkUserId: signInResponse.createdSessionId ?? "",
      };

      await saveUserToDB(userData);
      navigate("/");
      window.location.reload();
    } catch (error) {
      let errorMessage = "Credenciais inválidas. Tente novamente.";

      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }

      setError(errorMessage);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Login - plantPeace</title>
      </Helmet>
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
};

export default LoginPage;
