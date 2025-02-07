// components/Sidebar.tsx
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-62 h-screen border-r border-gray-300 flex flex-col py-2">

      <div className="text-lg font-medium text-[#475569] border-b-2 border-gray-200 pb-2 px-5">Filter</div>

      <div className="flex flex-col space-y-4 pl-5">
        <div className="text-base font-semibold text-[#475569] pt-6">Categories</div>

        <div className="flex flex-col space-y-4">
          {["Indoor", "Outdoor", "Terrace & Balcony", "Office Desk"].map(
            (category) => (
              <label key={category} className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-[#475569]">{category}</span>
              </label>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
