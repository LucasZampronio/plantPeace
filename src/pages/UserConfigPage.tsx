import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import UserConfigForm from "../components/UserConfig/UserConfigForm";
import { Helmet } from "react-helmet";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<{
    id: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = await getToken();
        const response = await fetch(
          `http://localhost:3001/users?clerkUserId=${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data.length > 0 ? data[0] : null);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUserData();
  }, [user, getToken, navigate]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!pendingEmail || !user) return;

      try {
        const emailAddress = user.emailAddresses.find(
          (e) => e.id === pendingEmail.id
        );

        if (emailAddress?.verification.status === "verified") {
          await user.update({ primaryEmailAddressId: emailAddress.id });

          const token = await getToken();
          await fetch(`http://localhost:3001/users/${userData?.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...userData,
              email: pendingEmail.email,
            }),
          });

          setSuccessMessage("Email principal atualizado com sucesso!");
          setPendingEmail(null);
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Erro ao verificar email:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [pendingEmail, user, userData, getToken]);

  const handleSubmit = async (updatedData: { name: string; email: string }) => {
    if (!user || !userData) return;

    try {
      await user.update({ firstName: updatedData.name });

      if (updatedData.email !== user.primaryEmailAddress?.emailAddress) {
        const newEmail = await user.createEmailAddress({
          email: updatedData.email,
        });

        await newEmail.prepareVerification({
          strategy: "email_code", 
        });

        setPendingEmail({
          id: newEmail.id,
          email: updatedData.email,
        });

        setSuccessMessage(
          "Enviamos um código de verificação. Por favor, verifique seu novo email antes de continuar."
        );
        return;
      }

      // Atualiza o JSON Server
      const token = await getToken();
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
        setSuccessMessage("Perfil atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Erro desconhecido"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-800 transition-colors duration-300">
      <Helmet>
        <title>User Configuration - plantPeace</title>
      </Helmet>

      {user ? (
        <UserConfigForm
          onSubmit={handleSubmit}
          user={{
            name: user.firstName || "",
            email: user.primaryEmailAddress?.emailAddress || "",
          }}
          errorMessage={errorMessage}
          successMessage={successMessage}
          pendingEmail={pendingEmail?.email}
        />
      ) : (
        <p className="text-gray-800 dark:text-gray-200">Carregando...</p>
      )}
    </div>
  );
};

export default UserConfigPage;
