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
    return <div>Carregando...</div>; // to vendo uns videos de como fazer uma animação daora de loading
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
      {/* Seção de detalhes da planta */}
      <div className="flex-1 flex flex-col pt-[var(--header-height)] py-5 justify-center items-center w-full h-auto">
        <div className="pb-3 pl-25 self-start">
          <h1 className="font-playfair text-3xl font-bold text-teal-800 mb-1 leading-tight">
            {plant.name}
          </h1>
          <p className="font-inter text-lg text-gray-500 m-0">
            {plant.subtitle}
          </p>
        </div>

        <img
          src={plant.imageUrl}
          alt="Plant"
          className="w-140 h-96 object-cover mb-6 rounded-sm shadow-lg"
        />

        <div className="mb-2 pr-45">
          <div className="flex gap-6 w-full">
            <div className="mb-4">
              <p className="font-inter text-md font-medium text-gray-800 mb-2">
                Price
              </p>
              <p className="font-inter text-md text-gray-500">${plant.price}</p>
            </div>
            <div>
              <p className="font-inter text-md font-medium text-gray-800 mb-2">
                Discount Porcentage
              </p>
              <p className="font-inter text-md text-gray-500">
                {plant.discountPorcentage}%
              </p>
            </div>
            <div>
              <p className="font-inter text-md font-medium text-gray-800 mb-2">
                Highlight Product
              </p>
              <p className="font-inter text-md text-gray-500">
                {plant.highlightItem ? "Sim" : "Não"}
              </p>
            </div>
          </div>

          {/* Segunda linha: Description e Category */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-inter text-md font-medium text-gray-800 mb-2">
                Description
              </p>
              <p className="font-inter text-md text-gray-500">
                {plant.description}
              </p>
            </div>
            <div>
              <p className="font-inter text-md font-medium text-gray-800 mb-2">
                Category
              </p>
              <p className="font-inter px-2 py-2 w-fit text-md text-gray-500 bg-teal-100 rounded-full">
                {plant.category}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate(`/plants/${plant.id}`)}
          className="w-150 py-1 mt-2 bg-teal-800 rounded-4xl text-white font-inter text-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-teal-700"
        >
          Edit Plant
        </button>
      </div>

      {/* Seção de imagem de fundo */}
      <div
        className="flex-1"
        style={{
          backgroundImage: `url(${planta})`,
          minHeight: "400px",
          flex: "1",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};

export default PlantDetail;
