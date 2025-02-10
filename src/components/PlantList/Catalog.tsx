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
  // Estado para controlar o carregamento das imagens
  const [loadingImages, setLoadingImages] = useState(true);

  // Função para quando a imagem for carregada
  const handleImageLoad = () => {
    setLoadingImages(false);
  };

  return (
    <div className="flex w-full p-4 bg-white dark:bg-neutral-900">
      {/* Condicionalmente exibe o loading enquanto as imagens carregam */}
      {loadingImages && (
        <div className="absolute inset-0 flex justify-center items-center bg-emerald-800 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {/* Grid responsiva para o catálogo */}
      <div className="bg-white justify-center mx-auto pl-5 dark:bg-neutral-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-14">
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
              className="relative flex flex-col items-start rounded-sm overflow-hidden cursor-pointer"
            >
              {/* Imagem da planta */}
              <img
                src={
                  plant.imageUrl ||
                  "https://img.freepik.com/fotos-gratis/monstera-deliciosa-planta-em-um-vaso_53876-133116.jpg?semt=ais_hybrid"
                }
                alt={plant.name}
                className="w-64 h-64 object-cover border-2 border-gray-50"
                onLoad={handleImageLoad} // Chama a função quando a imagem carregar
              />
              <div className="absolute top-2 right-2 max-w-[90%] bg-green-200 rounded-2xl p-1 border-2 border-green-100 text-sm sm:text-base text-center">
                {plant.category}
              </div>
              <div className="pt-1 text-2xl font-semibold text-[#475569] text-left">
                {plant.name}
              </div>
              <div className="pt-1 text-base text-[#64748B] text-left">
                $
                {!isNaN(Number(plant.price))
                  ? Number(plant.price).toFixed(2)
                  : "Preço inválido"}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Catalog;
