import imageHero from "../images/heroimage.png"
import waterIcon from "../images/watericonmain.svg"
import sunlightIcon from "../images/shopiconmain.svg"
import shopIcon from "../images/shopiconmain.svg"
import dualImage01 from "../images/dualimagemain01.png"
import dualImage02 from "../images/dualimagemain02.png"
import imageField from "../images/fieldphotomain.png"
import leftArrow from "../images/leftarrow.svg"
import rightArrow from "../images/rightarrow.svg"

export const Home = () => {
  return (
    <body className="font-[Inter]">
      <section className="h-[636px] grid grid-cols-2">
        <div className="gap-6 content-around px-[10%] flex flex-col justify-center items-start flex-1">
            <h1 className="font-[Playfair_Display] text-[64px] font-bold text-emerald-900">Discover your green side</h1>
            <p className="text-slate-500">We are your one-stop destination for all things green and growing. Our website offers a wide array of stunning plants, ranging from vibrant flowers  to lush indoor foliage, allowing you to create your very own green oasis.</p>
            <button className={`text-white font-semibold bg-emerald-900 px-10 py-3 rounded-xl  cursor-pointer hover:bg-emerald-700 transition`}>Shop now</button>
        </div>
        <img className="flex-1 object-cover h-full w-full max-h-[635px]" src={imageHero} alt="A beautifull green plant whit no flowers and a blank wall" />
      </section>
      <section className="px-[5%] pt-36 pb-14 text-center grid grid-cols-3 gap-y-20 gap-x-12">
        <div className="flex flex-col gap-4 col-span-3">
          <h2 className="font-[Playfair_Display] text-[40px] font-bold text-emerald-900">Steps to take care of your plants</h2>
          <p className="text-slate-500 w-[60%] self-center">By following these three steps - proper watering, appropriate sunlight, and providing essential nutrients - you'll be well on your way to maintaining healthy and thriving plants.</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <img className="bg-emerald-900 rounded-full" src={waterIcon} alt="water drop icon" />
          <h3 className="text-slate-950 font-bold text-2xl py-6">Watering</h3>
          <p className="text-slate-500 pb-14">water your plants when the top inch of soil feels dry to the touch. Avoid overwatering, as it can lead to root  dehydration.</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <img className="bg-emerald-900 rounded-full" src={sunlightIcon} alt="sunlight icon" />
          <h3 className="text-slate-950 font-bold text-2xl py-6">Sunlight</h3>
          <p className="text-slate-500 pb-14">Most plants need adequate sunlight to thrive. Place your plants in areas that receive the appropriate amount of light for their specific needs</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <img className="bg-emerald-900 rounded-full" src={shopIcon} alt="shop icon" />
          <h3 className="text-slate-950 font-bold text-2xl py-6">Nutrients and Fertilizing</h3>
          <p className="text-slate-500 pb-14">Choose a suitable fertilizer based on the specific needs of your plants, whether it's a balanced or specialized formula.</p>
        </div>
      </section>
      <section className="px-[5%] pt-14 pb-20 grid grid-cols-2 justify-items-start">
        <div className="grid grid-cols-2">
          <img className="object-cover h-full max-h-[697px]" src={dualImage01} alt="" />
          <img className="object-cover h-full max-h-[697px]" src={dualImage02} alt="" />
        </div>
        <div className="flex flex-col w-[555px] gap-8 items-baseline">
        <img className="object-cover w-full max-w-[555px]" src={imageField} alt="" />
          <p className="text-slate-500">Our website offers a wide array of stunning plants, ranging from vibrant flowers to lush indoor foliage, allowing you to create your very own green oasis. In addition to our extensive plant selection, we also provide gardening kits and fertilizers to equip you with everything you need to nurture your plants and achieve gardening success. But we don't stop there! We believe that knowledge is the key to a thriving garden, so we offer a wealth of information and resources on gardening techniques, plant care tips, and landscaping ideas. Whether you're a seasoned gardener or just starting your green journey, our goal is to inspire and support you every step of the way. Get ready to explore our virtual garden and discover the joys of gardening with us!</p>
          <button className={`text-white font-semibold bg-emerald-900 px-10 py-3 rounded-xl  cursor-pointer hover:bg-emerald-700 transition`}>See more photos</button>
        </div>
      </section>
      <section className="px-[5%] grid grid-cols-2">
        <div className="grid gap-4">
          <h1 className="font-[Playfair_Display] font-bold text-[40px] text-emerald-900 w-[70%]">This weeks Most Popular and best selling</h1>
          <p className="text-slate-500 w-[80%]">Take a look at our popular products. Take advantage of promotions and find similar products.</p>
        </div>
        <div className="flex justify-end items-end gap-6">
          <a href="#"><img src={leftArrow} alt="" /></a>
          <a href="#"><img src={rightArrow} alt="" /></a>
        </div>
        <div className="h-[465px] pt-8">
          <p>Carousel</p>
        </div>
      </section>
    </body>
    
  )
}
