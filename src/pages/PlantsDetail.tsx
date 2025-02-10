import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
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
    return <div>Carregando...</div>; // Aqui você pode adicionar uma animação de loading depois
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <Helmet>
        <title>Plant's Detail - plantPeace</title>
      </Helmet>
      {/* Seção de detalhes da planta */}
      <div className="flex-1 flex flex-col pt-[100px] md:pt-[120px] px-8 py-8 justify-start items-start max-w-[650px]">
        {/* Título e subtítulo */}
        <div className="pb-6 w-full">
          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-teal-800  mb-2 leading-tight">
            {plant.name}
          </h1>
          <p className="font-inter text-base md:text-lg text-gray-500 dark:text-gray-300">
            {plant.subtitle}
          </p>
        </div>

        {/* Imagem da planta */}
        <img
          src={plant.imageUrl}
          alt="Plant"
          className="w-full max-w-[600px] h-72 md:h-[450px] lg:h-[500px] object-cover mb-6 rounded-sm shadow-lg"
        />

        {/* Informações da planta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div>
            <p className="font-inter text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
              Price
            </p>
            <p className="font-inter text-md text-gray-500 dark:text-gray-400">
              ${plant.price}
            </p>
          </div>
          <div>
            <p className="font-inter text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
              Discount Percentage
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
              {plant.highlightItem ? "Sim" : "Não"}
            </p>
          </div>
        </div>

        {/* Descrição e Categoria */}
        <div className="mt-6 w-full">
          <div className="mb-4">
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
            <p className="font-inter px-4 py-1 w-fit text-md text-gray-500 dark:text-gray-300 bg-teal-100 dark:bg-teal-900 rounded-full">
              {plant.category}
            </p>
          </div>
        </div>

        {/* Botão */}
        <button
          onClick={() => navigate(`/plants/${plant.id}`)}
          className="w-full py-2 px-4 mt-4 bg-teal-800 rounded-2xl text-white font-inter text-sm md:text-base font-semibold cursor-pointer transition-colors duration-200 hover:bg-teal-700 dark:hover:bg-teal-500"
        >
          Edit Plant
        </button>
      </div>

      {/* Seção de imagem de fundo */}
      <div
        className="flex-1 min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${planta})`,
        }}
      />
    </div>
  );
};

export default PlantDetail;
