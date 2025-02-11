import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Plant {
  id: number;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
}

interface CatalogProps {
  plants: Plant[];
  searchResult: string | null;
}

const Catalog: React.FC<CatalogProps> = ({ plants, searchResult }) => {
  const [loadingImages, setLoadingImages] = useState(true);

  const handleImageLoad = () => {
    setLoadingImages(false);
  };

  return (
    <div className="flex bg-white dark:bg-neutral-900 w-full">
      {/* Condicionalmente exibe o loading enquanto as imagens carregam */}
      {loadingImages && (
        <div className="absolute inset-0 flex justify-center items-center bg-emerald-800 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {/* Grid responsiva para o catálogo */}
      <div className="bg-white justify-center pl-20 dark:bg-neutral-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-20 gap-y-10 gap w-full">
        {plants
          .filter(
            (plant) =>
              !searchResult ||
              plant.name.toLowerCase().includes(searchResult.toLowerCase())
          )
          .map((plant) => (
            <Link
              key={plant.id}
              to={`/plants/detail/${plant.id}`} // Define a rota dinâmica
              className="relative flex flex-col items-start rounded-sm overflow-hidden cursor-pointer w-full"
            >
              <img
                src={
                  plant.imageUrl ||
                  "https://img.freepik.com/fotos-gratis/monstera-deliciosa-planta-em-um-vaso_53876-133116.jpg?semt=ais_hybrid"
                
                }
                alt={plant.name}
                className="h-[318px] w-[318px] object-cover border-2 border-gray-50"
                onLoad={handleImageLoad} // Chama a função quando a imagem carregar
              />
              <div className="absolute top-3 right-2 max-w-[90%] bg-emerald-100 text-emerald-900 rounded-full p-2 border-2 border-emerald-50 text-sm sm:text-base text-center">
                {plant.category}
                </div>
              <div className="text-2xl font-semibold text-[#475569] text-left">
                {plant.name}
              </div>
              <div className="text-base text-[#64748B] text-left">
                $
                {!isNaN(Number(plant.price))
                  ? Number(plant.price).toFixed(2)
                  : "Invalid price"}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Catalog;
