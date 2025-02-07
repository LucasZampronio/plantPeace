import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import PlantForm from "../components/PlantsForm";
import { PlantFormData } from "../hooks/usePlantForm";

export default function PlantsRegisterPage() {
  const { userId } = useAuth(); // Obtém o ID do usuário logado

  // Função que será chamada quando o formulário for enviado
  const handleSubmit = async (plantData: PlantFormData) => {
    try {
      const response = await fetch("http://localhost:3001/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...plantData, 
          ownerId: userId, 
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar a planta");
      }

      const data = await response.json();
      console.log("Planta registrada com sucesso:", data);
      // aqui da pra redirecionar o usuário ou mostrar uma mensagem de sucesso
    } catch (error) {
      console.error("Erro:", error);
      // aqui da pra mostrar uma mensagem de erro para o usuário
    }
  };

  return (
    <>
      <SignedIn>
        <PlantForm mode="register" onSubmit={handleSubmit} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
