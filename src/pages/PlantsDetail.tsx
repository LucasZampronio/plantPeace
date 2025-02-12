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
      <div className="p-4 text-teal-800 dark:text-emerald-200">Loading...</div>
    );
  }

  return (
    <div className="flex flex-row lg:flex-row min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300">
      <div className="flex-1 flex flex-col py-5 justify-center items-center mt-25 w-full h-auto relative">
        
        <div className="absolute top-4 right-4 z-10"></div>
        
        <div className="flex flex-col items-center justify-center w-full">
          <div className="mb-6 pl-15 self-start">
            <h1 className="font-[Playfair_Display] text-3xl font-bold text-teal-800 dark:text-emerald-900 mb-1 leading-tight">
              {plant.name}
            </h1>
            <p className="font-[Inter] text-base text-slate-500 dark:text-slate-300 m-0">
              {plant.subtitle}
            </p>
          </div>
          <div className="flex justify-center w-full mb-6">
            <img
              src={plant.imageUrl}
              alt="Plant"
              className="w-100 h-80 sm:w-155 sm:h-90 md:w-180 md:h-100 lg:w-150 lg:h-100 xl:w-160.5 xl:h-96 object-cover rounded-sm shadow-lg dark:shadow-slate-700"
            />
          </div>

          <div className="w-full px-15">
            <div className="flex gap-6 w-full justify-start">
              <div className="mb-4">
                <p className="font-[Inter] text-md font-medium text-slate-800 dark:text-slate-200 mb-2">
                  Price
                </p>
                <p className="font-[Inter] text-md text-slate-500 dark:text-slate-400">
                  ${plant.price}
                </p>
              </div>
              <div>
                <p className="font-[Inter] text-md font-medium text-slate-800 dark:text-slate-200 mb-2">
                  Discount Porcentage
                </p>
                <p className="font-[Inter] text-md text-slate-500 dark:text-slate-400">
                  {plant.discountPorcentage}%
                </p>
              </div>
              <div>
                <p className="font-[Inter] text-md font-medium text-slate-800 dark:text-slate-200 mb-2">
                  Highlight Product
                </p>
                <p className="font-[Inter] text-md text-slate-500 dark:text-slate-400">
                  {plant.highlightItem ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p className="font-[Inter] text-md font-medium text-slate-800 dark:text-slate-200 mb-2">
                  Description
                </p>
                <p className="font-[Inter] text-md text-slate-500 dark:text-gray-400">
                  {plant.description}
                </p>
              </div>
              <div>
                <p className="font-[Inter] text-md font-medium text-slate-800 dark:text-gray-200 mb-2">
                  Category
                </p>
                <p className="font-[Inter] px-2 py-2 w-fit text-md text-emerald-900  bg-emerald-100 border-2 border-emerald-50 rounded-full">
                  {plant.category}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full pb-16 pt-3">
          <button
            onClick={() => navigate(`/plants/${plant.id}`)}
            className="sm:w-160 w-125 py-1 pt-2 sm:py-1 sm:pt-2 bg-emerald-900 dark:bg-emerald-900 rounded-md text-white font-inter text-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-700"
          >
            Edit Plant
          </button>
        </div>
      </div>

      <div
        className="flex-1 dark:bg-gray-800 md:hidden lg:block xl:block hidden"
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
