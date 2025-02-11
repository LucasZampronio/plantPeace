// pages/PlantListPage.tsx
import React, { useState, useEffect } from "react";
import SearchBar from "../components/PlantList/SearchBar";
import Catalog from "../components/PlantList/Catalog";
import Sidebar from "../components/PlantList/SideBar";
import { Helmet } from 'react-helmet';

interface Plant {
  id: number;
  name: string;
  category: string;
  price: string; // 'price' continua sendo string, conforme seu DB
  imageUrl: string;
  discountPorcentage?: string;
}

const PlantListPage: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Busca as plantas do json-server
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:3001/plants");
        const data: Plant[] = await response.json();
        setPlants(data);
      } catch (error) {
        console.error("Erro ao buscar plantas:", error);
      }
    };

    fetchPlants();
  }, []);

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    setSelectedCategories((prev) =>
      isChecked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch =
      !searchResult ||
      plant.name.toLowerCase().includes(searchResult.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(plant.category);
    return matchesSearch && matchesCategory;
  });

  // Função de busca
  const handleSearch = (query: string): boolean => {
    const found = plants.some((plant) =>
      plant.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResult(found ? query : null);
    return found;
  };

  return (
    // No mobile (até md) os itens serão empilhados (flex-col);
    // a partir de md o layout permanece em linha (flex-row), conforme o design original.
    <div className="flex flex-col md:flex-row py-22">
      <Helmet>
        <title>Plants List - plantPeace</title>
      </Helmet>
      <Sidebar 
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
      <div className="flex flex-col">
        <SearchBar onSearch={handleSearch} />
        <Catalog 
          plants={filteredPlants} 
          searchResult={searchResult} 
        />
      </div>
      <footer className="h-[422px] mt-[52.32px]"></footer>
    </div>
  );
};

export default PlantListPage;
