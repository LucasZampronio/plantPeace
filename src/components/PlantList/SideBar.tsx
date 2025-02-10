// components/Sidebar.tsx
interface SidebarProps {
  selectedCategories: string[];
  onCategoryChange: (category: string, isChecked: boolean) => void;
}

const SideBar: React.FC<SidebarProps> = ({
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div className="p-10 md:py-4 sm:p-0 w-62 gap-10 md:gap-4 sm:gap-2 sm:px-0 h-120vh md:border-r border-gray-300 flex flex-col py-4 bg-white dark:bg-neutral-900">
      {/* Div do Filtro */}
      <div className="border-b border-gray-300 pb-3 mb-4 font-normal text-lg text-[#475569] px-6">
        Filter
      </div>

      <div className=" border-gray-300 font-normal text-lg text-[#475569] px-6">
        Categories
      </div>

      {["Indor", "Outdoor", "Terracy e Balcony", "Office Desk"].map(
        (category) => (
          <label
            key={category}
            className="flex items-center space-x-2 px-6 group"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={(e) => onCategoryChange(category, e.target.checked)}
              className="h-5 w-5"
            />
            <span className=" text-[#64748B] text-sm font-normal transition-colors group-hover:text-gray-800">
              {category}
            </span>
          </label>
        )
      )}
    </div>
  );
};

export default SideBar;
