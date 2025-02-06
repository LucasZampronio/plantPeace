import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import photo1 from "../../images/photo-1-carroussel.png";
import photo2 from "../../images/photo-2-carroussel.png";
import photo3 from "../../images/photo-3-caroussel.png";
import photo4 from "../../images/photo-4-carroussel.png";
import Button from "../Button";

const Fourth = () => {

  // comportamento do botao esquerdo do carrossel
  const PrevArrow = ({ onClick }: { onClick: () => void }) => (
    <button
      className="absolute left-0 z-10 p-2 bg-green-700 rounded-full shadow-md hover:bg-gray-200 transition"
      onClick={onClick}
      style={{ top: "50%", transform: "translateY(-50%)", left: "-40px" }}
    >
      <ArrowLeft size={35} />
    </button>
  );

  // comportamento do botao direito do carrossel
  const NextArrow = ({ onClick }: { onClick: () => void }) => (
    <button
      className="absolute right-0 z-10 p-2 bg-green-700 rounded-full shadow-md hover:bg-gray-200 transition"
      onClick={onClick}
      style={{ top: "50%", transform: "translateY(-50%)", right: "-40px" }}
    >
    {/* controlando o tamanho do icone */}
      <ArrowRight size={35} />
    </button>
  );

  // configuracoes gerais do carrossel
  const settings = {
    dots: true, // exibe os pontinhos de navegação
    infinite: true, // roda infinitamente
    speed: 500, // velocidade de transição
    slidesToShow: 3, // quantidade de itens exibidos
    slidesToScroll: 1, // quantidade de itens rolados
    prevArrow: <PrevArrow onClick={() => {}} />, // definindo meu botão esquerdo
    nextArrow: <NextArrow onClick={() => {}} />, // definindo meu botão direito
    //lidando com a responsividade do carrossel para diversas telas
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
  const items = [
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
        {/* configuracoes do carrossel */}
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id} className="px-2 outline-none">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                <div className="h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                  {/* Palavras-chave */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-green-200 text-green-700 border-2 border-white px-2 py-1 rounded-full text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-green-600 text-lg font-medium mb-4">
                  {item.price}
                </p>
                <Button className="w-full py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Fourth;
