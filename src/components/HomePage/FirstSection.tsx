import imageHero from "../../images/defautplant.png";
import { Link } from "react-router-dom";

const FirstSection = () => {
  return (
    // Adiciona padding-top para evitar sobreposição com o header
    <section className="pt-24 md:pt-32 md:h-[636px] flex flex-col md:grid md:grid-cols-2">
      <div className="gap-6 content-around px-[10%] flex flex-col justify-center items-start flex-1">
        <h1 className="font-[Playfair_Display] text-[40px] md:text-[64px] font-bold text-emerald-900 w-full">
          Discover your green side
        </h1>
        <p className="text-slate-500 text-base md:text-lg">
          We are your one-stop destination for all things green and growing.
          Our website offers a wide array of stunning plants, ranging from
          vibrant flowers to lush indoor foliage, allowing you to create your
          very own green oasis.
        </p>
        <Link
          to="/plants/list"
          className="text-white font-semibold bg-emerald-900 px-6 py-2 md:px-10 md:py-3 rounded-xl cursor-pointer hover:bg-emerald-700 transition"
        >
          Shop now
        </Link>
      </div>
      {/* No mobile, a imagem é removida; em md e acima, ela é exibida */}
      <img
        className="hidden md:block flex-1 object-cover h-full w-full max-h-[635px]"
        src={imageHero}
        alt="A beautifull green plant with no flowers and a blank wall"
      />
    </section>
  );
};

export default FirstSection;
