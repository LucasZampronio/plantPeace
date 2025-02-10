import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC<{ onSearch: (query: string) => boolean }> = ({
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [borderColor, setBorderColor] = useState("border-gray-300");
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputQuery = e.target.value;
    setQuery(inputQuery);

    // busca em tempo real, sem o botão de busca
    const found = onSearch(inputQuery);
    setBorderColor(found ? "border-green-400" : "border-red-400");
    setHasSearched(true);
  };

  const handleAddClick = () => {
    navigate("/plants/register");
  };

  return (
    <div className="w-full p-3 flex flex-col bg-white dark:bg-neutral-900">
      {/* Container principal responsivo */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full">
        {/* Input container com crescimento flexível */}
        <div className="flex-grow">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            className={`w-full h-10 md:h-12 rounded-lg bg-[#F1F5F9] dark:bg-neutral-800 border ${borderColor} 
              transition-border duration-300 px-4 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-emerald-500 focus:outline-none
              min-w-[200px] md:max-w-300 dark:border-neutral-600`}
            placeholder="Search by name"
          />
        </div>

        {/* Botão responsivo */}
        <button
          onClick={handleAddClick}
          className="px-4 md:px-8 py-2 bg-[#064E3B] text-[#FCFCFC] rounded-lg 
            hover:bg-[#3f875e] transition-colors duration-300
            text-sm md:text-base font-semibold whitespace-nowrap
            flex-shrink-0 h-10 md:h-12"
          style={{
            fontFamily: "Inter",
            lineHeight: "24.72px",
          }}
        >
          Add Plant
        </button>
      </div>

      {/* Mensagem de erro responsiva */}
      {hasSearched && !borderColor.includes("green") && (
        <div
          className="mt-4 w-full p-3 md:p-4 bg-white dark:bg-neutral-800 rounded-lg 
          border border-gray-200 dark:border-neutral-600 text-center
          text-sm md:text-base text-gray-600 dark:text-gray-300"
        >
          Desculpe, não encontramos o item pesquisado! Tente novamente, estamos
          felizes em te ajudar com sua busca.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
