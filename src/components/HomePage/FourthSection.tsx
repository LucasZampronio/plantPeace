import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowButton from "../ArrowButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CarouselItem {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  highlightItem: boolean;
  category: string;
}

const Fourth = () => {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/plants")
      .then((response) => response.json())
      .then((data) =>
        setItems(data.filter((plant: CarouselItem) => plant.highlightItem))
      )
      .catch((error) => console.error("Erro ao buscar plantas:", error));
  }, []);

  const settings = {
    dots: items.length > 1,
    infinite: items.length > 1, 
    speed: 500,
    slidesToShow: Math.min(items.length, 3),
    slidesToScroll: 1,
    centerMode: items.length === 1,
    centerPadding: "0",
    prevArrow: <ArrowButton direction="left" onClick={() => {}} />, 
    nextArrow: <ArrowButton direction="right" onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(items.length, 2),
          infinite: items.length > 1,
          dots: items.length > 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(items.length, 1),
          infinite: items.length > 1,
          dots: items.length > 1,
        },
      },
    ],
  };

  const handleCardClick =
    (item: CarouselItem) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      navigate(`/products/${item.id}`);
    };

  return (
    <section className="flex flex-col justify-center items-center px-4 md:px-40 py-16">
      <div className="flex flex-col self-start mb-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">
          This week's Most Popular and Best Selling
        </h1>
        <p className="text-gray-500 text-lg">
          Discover our carefully curated selection of premium plants and
          gardening essentials.
        </p>
      </div>

      <div
        className={`w-full relative mx-auto ${
          items.length === 1
            ? "max-w-md"
            : items.length === 2
            ? "max-w-4xl"
            : "max-w-6xl"
        }`}
      >
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id} className="outline-none group px-2">
              <a
                href={`/products/${item.id}`}
                onClick={handleCardClick(item)}
                className={`bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 block cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  items.length === 1
                    ? "max-w-xs mx-auto"
                    : items.length === 2
                    ? "max-w-sm"
                    : "max-w-sm"
                }`}
                aria-label={`View details about ${item.name}`}
              >
                <div
                  className={`${
                    items.length === 1
                      ? "h-48"
                      : items.length === 2
                      ? "h-56"
                      : "h-64"
                  } bg-gray-100 rounded-lg mb-5 overflow-hidden relative`}
                >
                  {/* Balãozinho da categoria */}
                  <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-1">
                    {item.category}
                  </span>

                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl text-black font-semibold mb-2">
                  {item.name}
                </h3>
                <p className="text-green-900 text-lg font-medium mb-4">
                  ${item.price}
                </p>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Fourth;
