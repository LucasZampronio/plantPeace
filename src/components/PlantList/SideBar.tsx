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
    <div className="flex flex-col min-w-[250px] max-w-[100px] border-r gap-4 border-gray-300 bg-white dark:bg-neutral-900">
      {/* Div do Filtro */}
      <div className="border-b border-gray-300 pb-3 pt-5 font-normal text-lg text-[#475569] px-6">
        Filter
      </div>

      <div className=" border-gray-300 font-normal text-md text-[#475569] px-6">
        Categories
      </div>

      {["indoor", "outdoor", "terracy e balcony", "office desk"].map(
        (category) => (
          <label
            key={category}
            className="flex items-center space-x-2 px-6 group"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={(e) => onCategoryChange(category, e.target.checked)}
              className="h-6 w-6"
            />
            <span className=" text-[#64748B] text-[16px] font-normal transition-colors group-hover:text-gray-800">
              {category}
            </span>
          </label>
        )
      )}
    </div>
  );
};

export default SideBar;
