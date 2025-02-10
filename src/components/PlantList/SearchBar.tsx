import React, { useState } from "react";

const SearchBar: React.FC<{ onSearch: (query: string) => boolean }> = ({
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [borderColor, setBorderColor] = useState("border-gray-300");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    setHasSearched(true);
    const found = onSearch(query);
    setBorderColor(found ? "border-green-400" : "border-red-400");
  };

  return (
    <div className="w-full p-4 flex flex-col bg-white dark:bg-neutral-900">
      {/* Barra de pesquisa */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          className={`w-full md:w-5xl h-10 p-2 rounded-lg bg-[#F1F5F9] border ${borderColor}`}
          placeholder="Search by name"
        />
        <button
          onClick={handleSearchSubmit}
          className="px-8 py-2 bg-[#064E3B] text-[#FCFCFC] rounded-lg hover:bg-[#3f875e]"
          style={{
            fontFamily: "Inter",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "24.72px",
          }}
        >
          Search Plant
        </button>
      </div>

      {/* Mensagem de erro */}
      {hasSearched && !borderColor.includes("green") && (
        <div className="mt-4 w-full p-4 bg-white rounded-lg border border-gray-200 text-center">
          Desculpe, não encontramos o item pesquisado! Tente novamente, estamos
          felizes em te ajudar com sua busca.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
