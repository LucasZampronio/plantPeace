import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react"; // Importando o hook useAuth
import { useParams, useNavigate } from "react-router-dom";
import UserConfigForm from "../components/UserConfig/UserConfigForm";

const UserConfigPage = () => {
  const { userId } = useParams<{ userId: string }>(); // Pega o ID do usuário da URL
  console.log("userId:", userId);
  const { getToken } = useAuth(); // Obtém a função getToken

  interface UserData {
    nome: string;
    email: string;
    senha: string;
    username?: string; // Adicionando a propriedade para username
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtendo o token do Clerk
        const token = await getToken();

        // A URL do endpoint de usuários deve corresponder à sua estrutura de dados no servidor
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Passando o token no cabeçalho da requisição
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Dados do usuário retornados pela API:", data);

          // Atualizando o estado com os dados do usuário
          setUserData(data);
        } else {
          setSuccessMessage("Usuário não encontrado ou não autorizado.");
          navigate("/"); // Redireciona caso o usuário não seja encontrado ou não seja o usuário correto
        }
      } catch (error) {
        console.error("Erro:", error);
        setSuccessMessage("Erro ao buscar usuário");
      }
    };

    fetchUserData();
  }, [userId, navigate, getToken]);

  const handleSubmit = async (usuario: {
    nome: string;
    email: string;
    senha: string;
  }) => {
    try {
      const token = await getToken(); // Obtendo o token para a requisição

      const response = await fetch(`http://localhost:3001/usuarios/${userId}`, {
        method: "PUT", // Método PUT para editar usuário
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Passando o token no cabeçalho da requisição
        },
        body: JSON.stringify(usuario),
      });

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

  // Aqui você pode mostrar os dados do usuário, incluindo o username
  return (
    <div>
      {userData ? (
        <div>
          <p>Username: {userData.username || "Não disponível"}</p>{" "}
          {/* Exibindo o username */}
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
