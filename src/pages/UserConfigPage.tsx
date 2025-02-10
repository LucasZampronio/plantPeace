// UserConfigPage.tsx
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import UserConfigForm from "../components/UserConfig/UserConfigForm";
import { Helmet } from 'react-helmet';


interface UserData {
  name: string;
  email: string;
  clerkUserId: string;
  id: string;
}

const UserConfigPage = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      console.log("Usuário não autenticado, redirecionando para /sign-in");
      navigate("/sign-in");
      return;
    }

    console.log("Usuário autenticado:", user);

    const fetchUserData = async () => {
      try {
        const token = await getToken();
        console.log("Token obtido:", token);

        const response = await fetch(
          `http://localhost:3001/users?clerkUserId=${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Response da requisição:", response);

        if (response.ok) {
          const data = await response.json();
          console.log("Dados retornados da API:", data);

          if (data.length > 0) {
            setUserData(data[0]);
          } else {
            setSuccessMessage("Usuário não encontrado");
            console.log("Nenhum usuário encontrado com clerkUserId:", user.id);
          }
        } else {
          console.error("Response não OK:", response.statusText);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        setSuccessMessage("Erro ao buscar usuário");
      }
    };

    fetchUserData();
  }, [user, getToken, navigate]);

  const handleSubmit = async (updatedData: {
    name: string;
    email: string;
    currentPassword: string;
    newPassword: string;
  }) => {
    if (!user || !userData) return;

    try {
      console.log("Dados enviados para atualização:", updatedData);
      // Atualizar dados no Clerk
      await user.update({
        firstName: updatedData.name,
      });
      console.log("Nome atualizado no Clerk para:", updatedData.name);

      // Atualizar email se mudou
      if (updatedData.email !== userData.email) {
        await user.createEmailAddress({ email: updatedData.email });
        console.log("Email atualizado no Clerk para:", updatedData.email);
      }

      // Atualizar senha se foi alterada
      if (updatedData.newPassword) {
        await user.updatePassword({
          currentPassword: updatedData.currentPassword,
          newPassword: updatedData.newPassword,
        });
      }

      // Atualizar JSON Server
      const token = await getToken();
      console.log("Token para PUT:", token);
      const response = await fetch(
        `http://localhost:3001/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...userData,
            name: updatedData.name,
            email: updatedData.email,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Dados retornados após PUT:", data);
        setSuccessMessage("Perfil atualizado com sucesso!");
        setUserData(data);
      } else {
        console.error("Erro ao atualizar JSON Server:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na atualização:", error);
      setSuccessMessage("Erro ao atualizar perfil");
    }
  };

  return (
    <div>
      <Helmet>
        <title>User Configuration - plantPeace</title>
      </Helmet>
      {userData ? (
        <UserConfigForm
          onSubmit={handleSubmit}
          user={{ name: userData.name, email: userData.email }}
        />
      ) : (
        <p>Carregando dados...</p>
      )}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default UserConfigPage;
