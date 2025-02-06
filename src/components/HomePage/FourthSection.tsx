import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowButton from "../ArrowButton";
import photo1 from "../../images/photo-1-carroussel.png";
import photo2 from "../../images/photo-2-carroussel.png";
import photo3 from "../../images/photo-3-caroussel.png";
import photo4 from "../../images/photo-4-carroussel.jpeg";
import { useNavigate } from "react-router-dom"; 

//interface pra tipar os tipos do carroussel (por causa do ts)
interface CarouselItem {
  id: number;
  title: string;
  price: string;
  image: string;
  tags: string[];
}

const Fourth = () => {

  const navigate = useNavigate();

  // configuracoes gerais do carrossel
  const settings = {
    dots: true, // exibe os pontinhos de navegação
    infinite: true, // roda infinitamente
    speed: 500, // velocidade de transição
    slidesToShow: 3, // quantidade de itens exibidos
    slidesToScroll: 1, // quantidade de itens rolados
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

  // dados do carrossel (hard coded atualmente, dps precisa mudar para dados dinamicos vindo de uma API)
  const items:CarouselItem[] = [
    {
      id: 1,
      title: "Echinocereus Cactus",
      price: "$49.99",
      image: photo1,
      tags: ["Indoor", "Cactus"],
    },
    {
      id: 2,
      title: "Echinocereus Cactus",
      price: "$69.99",
      image: photo2,
      tags: ["Indoor", "Cactus"],
    },
    {
      id: 3,
      title: "Echinocereus Cactus",
      price: "$39.99",
      image: photo3,
      tags: ["Indoor", "Cactus"],
    },
    {
      id: 4,
      title: "Epipremnum aureum",
      price: "$29.99",
      image: photo4,
      tags: ["Indoor", "Cactus"],
    },
  ];

  const handleCardClick =
    (item: CarouselItem) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      navigate(`/products/${item.id}`);
    };

  return (
    <section className="flex flex-col justify-center items-center px-4 md:px-40 py-16">
      {/* cabecalho da section quatro */}
      <div className="flex flex-col self-start mb-12 max-w-4xl">
        {/* titulo da section */}
        <h1 className="text-3xl font-bold mb-4">
          This week's Most Popular and Best Selling
        </h1>
        {/* paragrafo da section */}
        <p className="text-gray-500 text-lg">
          Discover our carefully curated selection of premium plants and
          gardening essentials.
        </p>
      </div>

      {/* div do meu CARROSSEL */}
      <div className="w-full relative">
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id} className="px-5 outline-none group">
              {/* Melhor abordagem: Usar <a> para SEO e acessibilidade */}
              <a
                href={`/products/${item.id}`} // Altere para sua URL real
                onClick={handleCardClick(item)}
                className="bg-emerald-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 block cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label={`View details about ${item.title}`}
              >
                <div className="h-64 bg-gray-100 rounded-lg mb-5 overflow-hidden relative">
                  {/* Tags permanecem iguais */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-green-600 text-lg font-medium mb-4">
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
