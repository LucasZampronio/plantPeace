import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import SearchBar from './Components/SearchBar';

interface Plant {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

const App: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchResult, setSearchResult] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('http://localhost:3001/plants');
        const data = await response.json();
        setPlants(data);
      } catch (error) {
        console.error('Erro ao buscar plantas:', error);
      }
    };

    fetchPlants();
  }, []);

  const handleSearch = (query: string): boolean => {
    const found = plants.some(plant => plant.name.toLowerCase().includes(query.toLowerCase()));
    setSearchResult(found ? query : null);
    return found;
  };

  return (
    <div className="relative">
      <header className="h-[89px]"></header>
      <Sidebar />
      <SearchBar onSearch={handleSearch} />
      <div className=" top-[194px] left-[268px] gap-10 w-[1119px] h-auto flex flex-col">
        <div className="flex justify-between">
          {plants.filter(plant => !searchResult || plant.name.toLowerCase().includes(searchResult?.toLowerCase())).map(plant => (
            <div key={plant.id} className="w-[318px] h-[387.73px] flex flex-col">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-[318px] h-[317.18px] opacity-0.9"
              />
              <div
                className="w-auto h-[38.85px] p-[6.48px_12.95px] gap-[8.09px] rounded-tl-[19.43px] border-[1.62px] border-solid border-[#ECFDF5] bg-[#D1FAE5]"
                style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 400, lineHeight: '19.2px', color: '#064E3B' }}
              >
                {plant.category}
              </div>
              <div
                className="mt-[11px] text-[24px] font-inter font-semibold"
                style={{ fontFamily: 'Inter', lineHeight: '29.05px', color: '#475569' }}
              >
                {plant.name}
              </div>
              <div
                className="mt-[6.48px] text-[16px] font-inter font-normal"
                style={{ fontFamily: 'Inter', lineHeight: '24px', color: '#64748B' }}
              >
                ${plant.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="h-[422px] mt-[52.32px]"></footer>
    </div>
  );
};

export default App;
