import waterIcon from "../../images/watericonmain.svg";
import sunlightIcon from "../../images/suniconmain.svg"
import shopIcon from "../../images/shopiconmain.svg";

const SecondSection = () => {
  return (
    <section className="px-[5%] pt-36 pb-14 text-center grid grid-cols-3 gap-y-20 gap-x-12">
      <div className="flex flex-col gap-4 col-span-3">
        <h2 className="font-[Playfair_Display] text-[40px] font-bold text-emerald-900">
          Steps to take care of your plants
        </h2>
        <p className="text-slate-500 w-[60%] self-center">
          By following these three steps - proper watering, appropriate
          sunlight, and providing essential nutrients - you'll be well on your
          way to maintaining healthy and thriving plants.
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <img
          className="bg-emerald-900 rounded-full"
          src={waterIcon}
          alt="water drop icon"
        />
        <h3 className="text-slate-950 font-bold text-2xl py-6">Watering</h3>
        <p className="text-slate-500 pb-14">
          water your plants when the top inch of soil feels dry to the touch.
          Avoid overwatering, as it can lead to root dehydration.
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <img
          className="bg-emerald-900 rounded-full"
          src={sunlightIcon}
          alt="sunlight icon"
        />
        <h3 className="text-slate-950 font-bold text-2xl py-6">Sunlight</h3>
        <p className="text-slate-500 pb-14">
          Most plants need adequate sunlight to thrive. Place your plants in
          areas that receive the appropriate amount of light for their specific
          needs
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <img
          className="bg-emerald-900 rounded-full"
          src={shopIcon}
          alt="shop icon"
        />
        <h3 className="text-slate-950 font-bold text-2xl py-6">
          Nutrients and Fertilizing
        </h3>
        <p className="text-slate-500 pb-14">
          Choose a suitable fertilizer based on the specific needs of your
          plants, whether it's a balanced or specialized formula.
        </p>
      </div>
    </section>
  );
};

export default SecondSection;