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
        if (!response.ok) throw new Error("Planta não encontrada");
        const data = await response.json();
        setPlant(data);
      } catch (error) {
        console.error("Erro ao procurar dados:", error);
      }
    };

    fetchPlantData();
  }, [id]);

  if (!plant) {
    return (
      <div className="p-4 text-teal-800 dark:text-teal-200">Carregando...</div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Seção de detalhes da planta */}
      <div className="flex-1 flex flex-col py-5 justify-center items-center mt-25 w-full h-auto relative">
        <div className="absolute top-4 right-4 z-10">
          {/* <DarkMode /> */}
        </div>

        <div className="mb-5 pl-15 self-start">
          <h1 className="font-playfair text-3xl font-bold text-teal-800 dark:text-teal-200 mb-1 leading-tight">
            {plant.name}
          </h1>
          <p className="font-inter text-lg text-gray-500 dark:text-gray-300 m-0">
            {plant.subtitle}
          </p>
        </div>

        <img
          src={plant.imageUrl}
          alt="Plant"
          className="w-[642px] h-[385px] object-cover mb-6 rounded-sm shadow-lg dark:shadow-gray-700"
        />

        <div className="mb-2">
          <div className="flex gap-6 w-full pr-68">
            <div className="mb-4">
              <p className="font-inter text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                Price
              </p>
              <p className="font-inter text-md text-gray-500 dark:text-gray-400">
                ${plant.price}
              </p>
            </div>
            <div>
              <p className="font-inter text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                Discount Porcentage
              </p>
              <p className="font-inter text-md text-gray-500 dark:text-gray-400">
                {plant.discountPorcentage}%
              </p>
            </div>
            <div>
              <p className="font-inter text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                Highlight Product
              </p>
              <p className="font-inter text-md text-gray-500 dark:text-gray-400">
                {plant.highlightItem ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="font-inter text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                Description
              </p>
              <p className="font-inter text-md text-gray-500 dark:text-gray-400">
                {plant.description}
              </p>
            </div>
            <div>
              <p className="font-inter text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                Category
              </p>
              <p className="font-inter px-2 py-2 w-fit text-md text-gray-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-800 rounded-full">
                {plant.category}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full pb-16 pt-3">
          <button
            onClick={() => navigate(`/plants/${plant.id}`)}
            className="w-160 py-1 pt-2 bg-teal-800 dark:bg-teal-700 rounded-md text-white font-inter text-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-teal-700 dark:hover:bg-teal-600"
          >
            Edit Plant
          </button>
        </div>
      </div>

      {/* Seção de imagem de fundo */}
      <div
        className="flex-1 dark:bg-gray-800"
        style={{
          backgroundImage: `url(${planta})`,
          minHeight: "400px",
          flex: "1",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default PlantDetail;
