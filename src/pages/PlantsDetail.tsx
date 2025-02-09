import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import planta from "../images/defautplant.png";

interface PlantDetailProps {
  onEdit?: () => void;
}

interface Plant {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  discountPorcentage: string;
  highlightItem: boolean;
  description: string;
  category: string;
  imageUrl: string;
  ownerId: string;
}

const PlantDetail: React.FC<PlantDetailProps> = () => {
  const navigate = useNavigate();
  const [plant, setPlant] = useState<Plant | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/plants/${id}`);
        if (!response.ok) {
          throw new Error("Planta não encontrada");
        }
        const data = await response.json();
        setPlant(data);
      } catch (error) {
        console.error("Erro ao procurar dados:", error);
      }
    };

    fetchPlantData();
  }, [id]);

  if (!plant) {
    return <div className="text-center text-lg">Carregando...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen p-4 md:p-8">
      {/* Seção de detalhes da planta */}
      <div className="flex-1 flex flex-col items-center lg:items-start py-5 w-full">
        <div className="mb-5 w-full text-center lg:text-left">
          <h1 className="font-playfair text-3xl font-bold text-teal-800 mb-1 leading-tight">
            {plant.name}
          </h1>
          <p className="font-inter text-lg text-gray-500">{plant.subtitle}</p>
        </div>

        <img
          src={plant.imageUrl}
          alt="Plant"
          className="w-full max-w-md h-80 object-cover mb-6 rounded-sm shadow-lg"
        />

        <div className="w-full max-w-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div>
              <p className="font-inter text-md font-medium text-gray-800 mb-2">Preço</p>
              <p className="font-inter text-md text-gray-500">${plant.price}</p>
            </div>
            <div>
              <p className="font-inter text-md font-medium text-gray-800 mb-2">Desconto</p>
              <p className="font-inter text-md text-gray-500">{plant.discountPorcentage}%</p>
            </div>
            <div>
              <p className="font-inter text-md font-medium text-gray-800 mb-2">Destaque</p>
              <p className="font-inter text-md text-gray-500">
                {plant.highlightItem ? "Sim" : "Não"}
              </p>
            </div>
            <div>
              <p className="font-inter text-md font-medium text-gray-800 mb-2">Categoria</p>
              <p className="font-inter px-2 py-1 w-fit text-md text-gray-500 bg-teal-100 rounded-full">
                {plant.category}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-inter text-md font-medium text-gray-800 mb-2">Descrição</p>
            <p className="font-inter text-md text-gray-500">{plant.description}</p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/plants/${plant.id}`)}
          className="w-full max-w-xs py-2 mt-4 bg-teal-800 rounded-lg text-white font-inter text-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-teal-700"
        >
          Editar Planta
        </button>
      </div>

      {/* Seção de imagem de fundo */}
      <div
        className="hidden lg:block flex-1 bg-cover bg-center min-h-[400px]"
        style={{ backgroundImage: `url(${planta})` }}
      />
    </div>
  );
};

export default PlantDetail;