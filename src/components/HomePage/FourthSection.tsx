import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CarouselItem {
  id: number;
  name: string;
  price: string;
  discountPorcentage: string;
  imageUrl: string;
  highlightItem: boolean;
  category: string;
}

const Fourth = () => {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/plants")
      .then((response) => response.json())
      .then((data) => {
        const highlightedPlants = data.filter(
          (plant: CarouselItem) => plant.highlightItem
        );
        setItems(highlightedPlants);
      })
      .catch((error) => console.error("Erro ao buscar plantas:", error));
  }, []);

  // Ajustar navegação do carrossel
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= items.length - 3 ? 0 : prev + 1));
  };

  return (
    <section className="flex flex-col justify-center px-4 md:px-40 py-16">
      {/* Cabeçalho */}
      <div className="flex flex-col self-start mb-12 max-w-4xl px-4 md:px-8">
        <h1 className="font-[Playfair_Display] text-l md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4">
          This week's Most Popular and Best Selling
        </h1>
        <p className="text-gray-500 font-[Inter] text-xs md:text-lg lg:text-base">
          Lorem ipsum dolor sit amet consectetur. Amet a egestas mauris faucibus
          dolor volutpat adipiscing amet ipsum. In.
        </p>
      </div>

      {/* Controles do Carrossel */}
      <div className="flex justify-end items-center mb-4">
        {items.length > 3 && (
          <>
            <button
              onClick={handlePrev}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <ArrowLeft className="w-6 h-6 text-slate-400" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 hover:bg-gray-100 text-slate-400 rounded-full transition"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Carrossel */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-2"
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-1/3 flex-shrink-0 px-0" // Ajustado para exibir 3 itens por vez
            >
              <a
                href={`/plants/${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/plants/${item.id}`);
                }}
                className="block cursor-pointer group"
              >
                <div className="h-auto rounded-lg overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="relative w-[388px] h-[388px] border-1 border-gray-100 object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                  />
                  <span className="absolute top-4 right-10 bg-emerald-100 text-emerald-900 text-xs font-semibold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold dark:text-emerald-50">{item.name}</h3>
                  <p className="text-green-900 text-lg dark:text-emerald-50">${item.price}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fourth;
