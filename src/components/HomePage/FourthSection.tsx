import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowButton from "../ArrowButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// interface para tipar os itens do carrossel
interface CarouselItem {
  id: number;
  title: string;
  price: string;
  image: string;
  tags: string[];
}

const Fourth = () => {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const navigate = useNavigate();

  // Fazendo a requisição GET para pegar os itens do carrossel
  useEffect(() => {
    fetch("http://localhost:3001/carouselItems")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Erro ao buscar itens:", error));
  }, []);

  // configurações do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <ArrowButton direction="left" onClick={() => {}} />,
    nextArrow: <ArrowButton direction="right" onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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

      <div className="w-full relative">
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id} className="px-5 outline-none group">
              <a
                href={`/products/${item.id}`}
                onClick={handleCardClick(item)}
                className="bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 block cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label={`View details about ${item.title}`}
              >
                <div className="h-64 bg-gray-100 rounded-lg mb-5 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl text-green-800 font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-green-900 text-lg font-medium mb-4">
                  {item.price}
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
