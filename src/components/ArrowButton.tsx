import { ArrowLeft, ArrowRight } from "lucide-react";

interface ArrowButtonProps {
  onClick: () => void;
  direction: "left" | "right";
}

const ArrowButton = ({ onClick, direction }: ArrowButtonProps) => {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;
  const positionClass = direction === "left" ? "left-[-25px]" : "right-[-25px]";

  return (
    <button
      className={`absolute ${positionClass} z-10 p-2 rounded-full shadow-md transition bg-white dark:bg-emerald-900 dark:`}
      onClick={onClick}
      style={{ top: "50%", transform: "translateY(-50%)" }}
    >
      <Icon size={35} />
    </button>
  );
};

export default ArrowButton;
