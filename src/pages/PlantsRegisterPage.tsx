import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import PlantForm from "../components/PlantsForm";
import { createPlant, Plant } from "../api/plantsApi";

export default function PlantsRegisterPage() {
  //usando o hook useAuth do clerk para obter o token JWT
  const { getToken } = useAuth();

  const handleSubmit = async (data: Plant) => {
    try {
      const plantData: Plant = {
        ...data,
        createdAt: new Date().toISOString(),
      };

      const token = await getToken();
      if (!token) {
        throw new Error("Token is null");
      }
      await createPlant(plantData, token);

      console.log("Planta cadastrada com sucesso!");
      alert("Planta registrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar planta:", error);
      alert("Erro ao cadastrar planta. Verifique os dados e tente novamente.");
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
