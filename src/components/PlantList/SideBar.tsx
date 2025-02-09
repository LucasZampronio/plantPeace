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
    <div className="w-62 gap-2 px-4 h-120vh border-r border-gray-300 flex flex-col py-4 bg-white dark:bg-neutral-900">
      {["Indor", "Outdoor", "Terracy e Balcony", "Office Desk"].map(
        (category) => (
          <label key={category} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={selectedCategories.includes(category)}
              onChange={(e) => onCategoryChange(category, e.target.checked)}
            />
            <span className="text-[#475569]">{category}</span>
          </label>
        )
      )}

    </div>
  );
};

export default SideBar;