import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react"; // Importando o hook para registrar usuários
import { RegisterForm } from "../components/Login/register";
import { Helmet } from 'react-helmet';


// Definindo o tipo para os dados do usuário
interface UserData {
  email: string;
  clerkUserId: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { signUp } = useSignUp(); //hook do clerk

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

  const handleRegister = async (data: {
    email: string;
    password: string;
    stayConnected?: boolean;
  }) => {
    try {
      if (!signUp) {
        setError(
          "Não foi possível acessar o método de registro. Tente novamente."
        );
        return;
      }

      // cria o user no clerk
      const signUpResponse = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      const userId = signUpResponse.createdUserId; // obtendo o ID do user criado

      console.log("Usuário registrado com sucesso no Clerk:", userId);

      // dados do user para salvar no db.json
      const userData: UserData = {
        email: data.email,
        clerkUserId: userId ?? "", 
      };

      // salvando os dados do usuário no db.json
      await saveUserToDB(userData);

      // redirecionando para a página de login após o cadastro
      navigate("/sign-in");
    } catch (error) {
      console.error("Erro:", error);
      setError("Erro ao registrar usuário. Tente novamente.");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Register - plantPeace</title>
      </Helmet>
      <RegisterForm onSubmit={handleRegister} />
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
};

export default RegisterPage;
