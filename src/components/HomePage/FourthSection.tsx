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
  const [itemsPerView, setItemsPerView] = useState(3);
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

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth < 640 ? 1 : 3);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - itemsPerView : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= items.length - itemsPerView ? 0 : prev + 1));
  };

  return (
    <section className="flex flex-col justify-center px-4 md:px-20 py-16">
      <div className="flex flex-col self-start mb-12 max-w-full md:max-w-3xl lg:max-w-4xl px-4">
  <h1 className="font-[Playfair_Display] text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4">
    This week's Most Popular and Best Selling
  </h1>
  <p className="text-slate-500 text-xs sm:text-sm md:text-lg lg:text-base">
    Take a look at our popular products. Take advantage of promotions and find similar products.
  </p>
</div>


      <div className="flex justify-end items-center mb-4 mr-9.5">
        {items.length > itemsPerView && (
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

      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-2"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex-shrink-0 px-0 ${itemsPerView === 1 ? "w-full" : "w-1/3"}`}
            >
              <a
                href={`/plants/details/${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/plants/detail/${item.id}`);
                }}
                className="block cursor-pointer group"
              >
                <div className="h-auto overflow-hidden relative pl-6 sm:pl-0">
                <div className="relative w-100 h-100 sm:w-[388px] sm:h-[388px]">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full border-1 border-gray-100 object-cover transition-transform duration-300 group-hover:scale-105 dark:border-black"
                  />
                  <span className="absolute top-4 right-16 bg-emerald-100 border-emerald-50 border-2 text-emerald-900 text-md font-semibold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="mt-4 pl-6 sm:pl-0">
                <h3 className="text-xl text-slate-700 font-[Inter] dark:text-emerald-50">{item.name}</h3>
                <div className="text-base text-slate-600 dark:text-white text-left">
                
                {!isNaN(Number(item.price))
                  ? (
                    item.discountPorcentage ? (
                        <>
                        ${(Number(item.price) * (1 - Number(item.discountPorcentage) / 100)).toFixed(2)}
                        <span style={{ marginLeft: '10px' }}> </span>
                          <span className="line-through mr-2 text-base text-slate-400">
                            ${Number(item.price).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <> $  {Number(item.price).toFixed(2)} </>
                      )
                    )
                  : "Invalid price"}
              </div>
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
