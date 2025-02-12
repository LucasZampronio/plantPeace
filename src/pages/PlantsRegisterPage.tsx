import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import PlantForm from "../components/PlantsForm";
import { PlantFormData } from "../hooks/usePlantForm";
import { Helmet } from 'react-helmet';


export default function PlantsRegisterPage() {
  const { userId } = useAuth();

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
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Plant's Register - plantPeace</title>
      </Helmet>
      <SignedIn>
        <div className="w-full max-w-md mx-auto p-4 md:max-w-none md:mx-0 md:p-0">
          <PlantForm mode="register" onSubmit={handleSubmit} />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
