import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import LoginForm from "../components/Login/login";

// Definindo o tipo para os dados do usuário
interface UserData {
  email: string;
  clerkUserId: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { signIn } = useSignIn(); // hook do Clerk para autenticar usuários

  // funcao para salvar os dados do usuário no db.json
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

      const data = await response.json();
      console.log("Usuário salvo com sucesso:", data);
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
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

      // autenticando o usuário utilizando o Clerk
      const signInResponse = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      // Se a auth for bem-sucedida, redireciona para a página principal
      console.log("Usuário autenticado com sucesso:", signInResponse);

      // obtem o id do usuário autenticado
      const clerkUserId = signInResponse.createdSessionId; // ou outro identificador único

      // salva os dados do usuário no db.json
      const userData: UserData = {
        email: data.email,
        clerkUserId: clerkUserId ?? "",
      };

      await saveUserToDB(userData);

      navigate("/sign-in");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
};

export default LoginPage;
