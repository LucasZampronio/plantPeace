import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"; // Remova useParams
import UserConfigForm from "../components/UserConfig/UserConfigForm";

const UserConfigPage = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();

  interface UserData {
    nome: string;
    email: string;
    senha: string;
    username?: string;
    id: string;
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Verifica se o usuário está autenticado
    if (!user) {
      navigate("/sign-in"); // Redireciona se não estiver logado
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = await getToken();
        
        // Usa o ID do Clerk diretamente
        const response = await fetch(
          `http://localhost:3001/users?clerkUserId=${user.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setSuccessMessage("Usuário não encontrado ou não autorizado.");
        }
      } catch (error) {
        console.error("Erro:", error);
        setSuccessMessage("Erro ao buscar usuário");
      }
    };

    fetchUserData();
  }, [navigate, getToken, user]); // Remova userId das dependências

  const handleSubmit = async (usuario: {
    nome: string;
    email: string;
    senha: string;
  }) => {
    try {
      if (!user) return;

      const token = await getToken();
      // Usa o ID do Clerk diretamente
      const response = await fetch(
        `http://localhost:3001/users/${userData?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(usuario),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(
          `Usuário atualizado com sucesso: ${data.nome} - ${data.email}`
        );
      } else {
        setSuccessMessage("Erro ao atualizar usuário");
      }
    } catch (error) {
      console.error("Erro:", error);
      setSuccessMessage("Erro ao atualizar usuário");
    }
  };

  return (
    <div>
      {userData ? (
        <div>
          <p>Username: {userData.username || "Não disponível"}</p>
          <UserConfigForm onSubmit={handleSubmit} user={userData} />
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default UserConfigPage;
