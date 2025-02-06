import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import PlantForm from "../components/PlantsForm";
import { PlantFormData } from "../hooks/usePlantForm";

export default function PlantsRegisterPage() {
  //usando o hook useAuth do clerk para obter o token JWT
  const { getToken } = useAuth();

  const handleSubmit = async (data: PlantFormData) => {
    try {
      // convertendo os tipos de dados para parseFloat e parseInt, pq os dados estao em string
      const plantData = {
        ...data,
        price: parseFloat(data.price.replace(/[^0-9.]/g, "")),
        discountPercentage: parseInt(
          (data.discountPorcentage || "0").replace("%", ""),
          10
        ),
        highlightItem: data.highlightItem || false,
        createdAt: new Date().toISOString(),
      };

      // obtendo token JWT do Clerk
      const token = await getToken();

      // enviando o token para o JSON-Server, para validacao
      const response = await fetch("http://localhost:3001/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // simulando autenticação via token JWT
        },
        body: JSON.stringify(plantData),
      });

      if (!response.ok) throw new Error("Falha no cadastro");

      console.log("Planta cadastrada com sucesso!");
      alert("Planta registrada com sucesso!");

      // limpa formulário ou redirecionar aqui se necessário
    } catch (error) {
      console.error("Erro:", error);
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
