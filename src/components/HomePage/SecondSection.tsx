import { Sun } from "lucide-react";
import { ShoppingBagIcon } from "lucide-react";
import { Droplet } from "lucide-react";

const SecondSection = () => {
  return (
    <section className="px-[5%] pt-36 pb-14 text-center grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-20 gap-x-0 md:gap-x-12">
      <div className="flex flex-col gap-4 col-span-1 md:col-span-3">
        <h2 className="font-[Playfair_Display] text-[28px] md:text-[40px] font-bold text-emerald-900">
          Steps to take care of your plants
        </h2>
        <p className="text-slate-500 w-full md:w-[60%] self-center text-sm md:text-base">
          By following these three steps - proper watering, appropriate
          sunlight, and providing essential nutrients - you'll be well on your
          way to maintaining healthy and thriving plants.
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <Droplet
          size={70}
          className="bg-emerald-900 text-white rounded-full p-4 hover:text-blue-400"
        />
        <h3 className="text-slate-950 font-bold text-xl md:text-2xl py-4 md:py-6">
          Watering
        </h3>
        <p className="text-slate-500 pb-8 md:pb-14 text-sm md:text-base">
          water your plants when the top inch of soil feels dry to the touch.
          Avoid overwatering, as it can lead to root dehydration.
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <Sun
          size={70}
          className="bg-emerald-900 text-white rounded-full p-4 hover:text-yellow-400"
        />
        <h3 className="text-slate-950 font-bold text-xl md:text-2xl py-4 md:py-6">
          Sunlight
        </h3>
        <p className="text-slate-500 pb-8 md:pb-14 text-sm md:text-base">
          Most plants need adequate sunlight to thrive. Place your plants in
          areas that receive the appropriate amount of light for their specific
          needs.
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <ShoppingBagIcon
          size={70}
          className="bg-emerald-900 text-white rounded-full p-4 hover:text-green-400"
        />
        <h3 className="text-slate-950 font-bold text-xl md:text-2xl py-4 md:py-6">
          Nutrients and Fertilizing
        </h3>
        <p className="text-slate-500 pb-8 md:pb-14 text-sm md:text-base">
          Choose a suitable fertilizer based on the specific needs of your
          plants, whether it's a balanced or specialized formula.
        </p>
      </div>
    </section>
  );
};

export default SecondSection;
