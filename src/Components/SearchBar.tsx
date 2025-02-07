import React, { useState } from 'react';

const SearchBar: React.FC<{ onSearch: (query: string) => boolean }> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [borderColor, setBorderColor] = useState('border-gray-300');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    const found = onSearch(query);
    setBorderColor(found ? 'border-green-400' : 'border-red-400');
  };

  return (
    <div className="">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        className={` absolute w-[936px] h-[43px]  top-[123px] left-[268px] p-[0_804px_0_0] gap-2 rounded-tl-lg rounded-bl-lg rounded-tr-lg rounded-br-lg bg-[#F1F5F9] border ${borderColor}`}
        placeholder="search by name"
        style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 400, lineHeight: '19.36px', textAlign: 'center', color: '#64748B' }}
      />
      <button
        onClick={handleSearchSubmit}
        className=" absolute top-[123px] left-[1232px] px-8 py-2 ml-[-1px] bg-[#064E3B] text-[#FCFCFC] rounded-tr-lg rounded-br-lg rounded-tl-lg rounded-bl-lg"
        style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600, lineHeight: '24.72px' }}
      >
        Add Plant
      </button>
      {query && !borderColor.includes('green') && (
        <div className="absolute w-[936px] h-[13px] top-[160px] left-[268px] mt-2 p-4  bg-white rounded-lg border border-gray-200">
          Desculpe, não encontramos o item pesquisado, tente novamente, estamos felizes em te ajudar com sua busca.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
