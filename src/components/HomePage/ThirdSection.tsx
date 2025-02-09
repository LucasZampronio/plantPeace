import image1 from "../../images/dualimagemain01.png";
import image2 from "../../images/dualimagemain02.png";
import imageField from "../../images/fieldphotomain.png";
import { Link } from "react-router-dom";

const ThirdSection = () => {
  return (
    // Mobile: grid de 1 coluna; Desktop: grid de 2 colunas (mantendo o layout original)
    <section className="px-[5%] pt-14 pb-20 grid grid-cols-1 md:grid-cols-2 justify-items-start">
      {/* Esta div com as duas imagens é oculta no mobile e exibida apenas no md */}
      <div className="hidden md:grid grid-cols-2">
        <img
          className="object-cover h-full max-h-[697px]"
          src={image1}
          alt=""
        />
        <img
          className="object-cover h-full max-h-[697px]"
          src={image2}
          alt=""
        />
      </div>
      {/* Conteúdo textual e botão */}
      <div className="flex flex-col w-full md:w-[555px] gap-8 items-baseline">
        {/* Esta imagem é exibida somente no desktop */}
        <div className="hidden md:block">
          <img
            className="object-cover w-full max-w-[555px]"
            src={imageField}
            alt=""
          />
        </div>
        <p className="text-slate-500 text-sm md:text-base">
          Our website offers a wide array of stunning plants, ranging from
          vibrant flowers to lush indoor foliage, allowing you to create your
          very own green oasis. In addition to our extensive plant selection, we
          also provide gardening kits and fertilizers to equip you with
          everything you need to nurture your plants and achieve gardening
          success. But we don't stop there! We believe that knowledge is the key
          to a thriving garden, so we offer a wealth of information and
          resources on gardening techniques, plant care tips, and landscaping
          ideas. Whether you're a seasoned gardener or just starting your green
          journey, our goal is to inspire and support you every step of the way.
          Get ready to explore our virtual garden and discover the joys of
          gardening with us!
        </p>
        <Link
          to={`/plants/list`}
          onClick={() => window.scrollTo(0, 0)}
          className="text-white font-semibold bg-emerald-900 px-6 py-2 md:px-10 md:py-3 rounded-xl cursor-pointer hover:bg-emerald-700 transition"
        >
          See more photos
        </Link>
      </div>
    </section>
  );
};

export default ThirdSection;
