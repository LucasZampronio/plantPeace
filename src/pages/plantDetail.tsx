import React, { useState, useEffect } from 'react';

interface PlantDetailProps {
  onEdit?: () => void;
}

interface Plant {
  title: string;
  subtitle: string;
  price: string;
  discount: string;
  highlight: string;
  description: string;
  category: string;
  imageUrl: string;
}

const PlantDetail: React.FC<PlantDetailProps> = ({
  onEdit = () => console.log("Edit clicked")
}) => {

  const [plant, setPlant] = useState<Plant | null>(null);


  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const response = await fetch('');
        const data = await response.json();
        
        setPlant(data);
      } catch (error) {
        console.error('Erro ao procurar dados:', error);
      }
    };

    fetchPlantData();
  }, []); 

  if (!plant) {
    return <div>Carregando...</div>; // to vendo uns videos de como fazer uma animação daora de loading
  }

  return (
    <div className="flex p-5 gap-10 bg-gray-50 min-h-screen">
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="font-playfair text-4xl font-bold text-teal-800 mb-1 leading-tight">
            {plant.title}
          </h1>
          <p className="font-inter text-lg text-gray-500 m-0">{plant.subtitle}</p>
        </div>

        <img
          src={plant.imageUrl}
          alt="Plant"
          className="w-full max-w-2xl h-96 object-cover mb-6"
        />

        <div className="mb-6">
          <div className="flex gap-6 mb-5">
            <div>
              <p className="font-inter text-lg font-medium text-gray-800 mb-2">Preço</p>
              <p className="font-inter text-lg text-gray-500">{plant.price}</p>
            </div>
            <div>
              <p className="font-inter text-lg font-medium text-gray-800 mb-2">Porcentagem de Trabalho</p>
              <p className="font-inter text-lg text-gray-500">{plant.discount}</p>
            </div>
            <div>
              <p className="font-inter text-lg font-medium text-gray-800 mb-2">Realçar Produto</p>
              <p className="font-inter text-lg text-gray-500">{plant.highlight}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-inter text-lg font-medium text-gray-800 mb-2">Descrição</p>
            <p className="font-inter text-lg text-gray-500 leading-loose">{plant.description}</p>
          </div>

          <div className="mb-6">
            <p className="font-inter text-lg font-medium text-gray-800 mb-2">Categoria</p>
            <span className="inline-block px-3 py-1 bg-teal-100 rounded-full border border-teal-200 text-teal-800 font-inter text-lg">
              {plant.category}
            </span>
          </div>

          <button
            onClick={onEdit}
            className="w-full py-3 px-10 bg-teal-800 rounded-lg text-white font-inter text-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-teal-700"
          >
            Editar planta
          </button>
        </div>
      </div>

      <div
        className="flex-1 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: `url(${plant.imageUrl})`,
        }}
      />
    </div>
  );
};

export default PlantDetail;
