interface SidebarProps {
  selectedCategories: string[];
  onCategoryChange: (category: string, isChecked: boolean) => void;
}

const SideBar: React.FC<SidebarProps> = ({
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-col gap-3 md:min-w-[250px] md:max-w-[100px] md:border-r md:gap-4 md:border-gray-300 bg-white dark:bg-neutral-900">
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
              className="hidden"
            />
            <span className="w-6 h-6 border-2 border-gray-200 rounded-lg flex items-center justify-center transition-colors group-hover:border-gray-800">
              {selectedCategories.includes(category) && (
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </span>
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
