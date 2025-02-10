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

  // Função chamada quando o formulário é enviado
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
      // Aqui você pode redirecionar ou mostrar uma mensagem de sucesso
    } catch (error) {
      console.error("Erro:", error);
      // Aqui você pode mostrar uma mensagem de erro para o usuário
    }
  };

  return (
    <>
      <Helmet>
        <title>Plant's Register - plantPeace</title>
      </Helmet>
      <SignedIn>
        {/* 
          No mobile (default) o formulário é envolvido por um container com 
          padding e largura máxima, deixando-o mais compacto.
          No desktop (a partir do breakpoint md), os utilitários são redefinidos
          para não alterar o design atual.
        */}
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
