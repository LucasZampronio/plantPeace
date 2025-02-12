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

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

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

        if (response.ok) {
          const data = await response.json();

          if (data.length > 0) {
            setUserData(data[0]);
          } else {
            setErrorMessage("Usuário não encontrado");
          }
        } else {
          setErrorMessage("Erro ao carregar usuário");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        setErrorMessage("Erro ao buscar usuário");
      }
    };

    fetchUserData();
  }, [user, getToken, navigate]);

  const handleSubmit = async (updatedData: {
    name: string;
    email: string;
  }) => {
    if (!user || !userData) return;

    try {
      console.log("Data sent for update:", updatedData);
      await user.update({
        firstName: updatedData.name,
      });
      console.log("Name updated in Clerk to:", updatedData.name);

      if (updatedData.email !== userData.email) {
        await user.createEmailAddress({ email: updatedData.email });
        console.log("Email updated in Clerk to:", updatedData.email);
      }

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
        setSuccessMessage("Profile updated successfully!");
        setErrorMessage(null);
        setUserData(data);
      } else {
        console.error("Error updating JSON Server:", response.statusText);
        setErrorMessage("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-800 transition-colors duration-300">
      <Helmet>
        <title>User Configuration - plantPeace</title>
      </Helmet>
      {userData ? (
        <UserConfigForm
          onSubmit={handleSubmit}
          user={{ name: userData.name, email: userData.email }}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      ) : (
        <p className="text-gray-800 dark:text-gray-200">Loading data...</p>
      )}
    </div>
  );
};

export default UserConfigPage;
