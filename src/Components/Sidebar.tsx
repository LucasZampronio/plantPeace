import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-[243px] h-[1195px]  top-[87px] left-[-2px] gap-0 border-r border-gray-300 flex flex-col">
      <div className="w-[38px] h-[19px] absolute top-[107px] left-[40px] text-[16px] font-inter font-normal leading-[19.2px] text-left text-[#475569]">
        Filter
      </div>
      <hr className="w-[243px] h-[1px] absolute top-[146px] left-[-2px] gap-0 bg-[#E2E8F0]" />
      <div className="w-[179px] h-[199px] absolute top-[179px] left-[40px] gap-0 flex flex-col">
        <div className="w-[179px] h-[19px] text-[16px] font-inter font-normal leading-[19.2px] text-left text-[#475569] underline decoration-skip-ink">
          Categories
        </div>
        <div className="mt-[24px] flex flex-col gap-[20px]">
          {['Indoor', 'Outdoor', 'Terrace & Balcony', 'Office Desk'].map((category) => (
            <label key={category} className="flex items-center">
              <input type="checkbox" className="mr-2" />
              {category}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
