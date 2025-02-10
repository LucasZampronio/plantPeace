import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { RegisterForm } from "../components/Login/register";
import { useAuth } from "@clerk/clerk-react";
import { Helmet } from "react-helmet";

interface UserData {
  firstName: string;
  email: string;
  clerkUserId: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { signUp } = useSignUp();
  const { signOut } = useAuth();

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

  const handleRegister = async (data: {
    email: string;
    firstName: string;
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

      const signUpResponse = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName,
      });

      const userData: UserData = {
        email: data.email,
        clerkUserId: signUpResponse.createdUserId ?? "",
        firstName: data.firstName,
      };

      await saveUserToDB(userData);
      await signOut();

      navigate("/sign-in?register=success");
      window.location.reload();
    } catch (error) {
      let errorMessage = "Erro ao registrar usuário. Tente novamente.";

      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }

      setError(errorMessage);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Register - plantPeace</title>
      </Helmet>
      <RegisterForm onSubmit={handleRegister} error={error} />
    </div>
  );
};

export default RegisterPage;
