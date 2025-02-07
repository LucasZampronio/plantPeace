import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import PlantForm from "../components/PlantsForm";
import { PlantFormData } from "../hooks/usePlantForm";

export default function PlantsEditPage() {
  const { userId } = useAuth();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<Partial<PlantFormData> | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      console.error("Erro: plantId não foi encontrado na URL.");
      return;
    }

    const loadPlantData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/plants/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados da planta");
        }
        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    loadPlantData();
  }, [id]);

  const handleSubmit = async (plantData: PlantFormData) => {
    try {
      const response = await fetch(`http://localhost:3001/plants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...plantData,
          ownerId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar a planta");
      }

      const data = await response.json();
      console.log("Planta editada com sucesso:", data);

      // Exibe a mensagem de sucesso
      setSuccessMessage("Planta editada com sucesso!");

      // Esconde a mensagem após 3 segundos
      setTimeout(() => {
        setSuccessMessage(null);
        navigate(0);
      }, 1000);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <>
      <SignedIn>
        {initialData ? (
          <PlantForm
            mode="edit"
            initialData={initialData}
            onSubmit={handleSubmit}
            successMessage={successMessage}
          />
        ) : (
          <p>Carregando...</p>
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
