import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import SearchBar from './Components/SearchBar';

const App: React.FC = () => {
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearch = (query: string): boolean => {
    const items = ['Card 1', 'Card 2', 'Card 3'];
    const found = items.some(item => item.toLowerCase().includes(query.toLowerCase()));
    if (found) {
      setSearchResult(query);
    } else {
      setSearchResult(null);
    }
    return found;
  };

  return (
    <div className="relative">
      <header className="h-[89px]"></header>
      <Sidebar />
      <SearchBar onSearch={handleSearch} />
      <div className="absolute top-[194px] left-[268px] gap-10 w-[1119px] h-auto flex flex-col">
        <div className="flex justify-between">
          {['Card 1', 'Card 2', 'Card 3'].filter(item => !searchResult || item.toLowerCase().includes(searchResult.toLowerCase())).map((item) => (
            <div key={item} className="w-[318px] h-[387.73px] flex flex-col">
              <img
                src="path/to/image"
                alt={item}
                className="w-[318px] h-[317.18px] opacity-0.9"
              />
              <div
                className="w-auto h-[38.85px] p-[6.48px_12.95px] gap-[8.09px] rounded-tl-[19.43px] border-[1.62px] border-solid border-[#ECFDF5] bg-[#D1FAE5]"
                style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 400, lineHeight: '19.2px', color: '#064E3B' }}
              >
                Category
              </div>
              <div
                className="mt-[11px] text-[24px] font-inter font-semibold"
                style={{ fontFamily: 'Inter', lineHeight: '29.05px', color: '#475569' }}
              >
                {item}
              </div>
              <div
                className="mt-[6.48px] text-[16px] font-inter font-normal"
                style={{ fontFamily: 'Inter', lineHeight: '24px', color: '#64748B' }}
              >
                $99.99
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
