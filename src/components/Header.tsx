import { useState } from "react"
import logo from "../images/logoicon.svg"

export const Header = () => {
    const [hidden , setHidden] = useState ("hidden")
    const [register , setRegister] = useState ("")
    const [name, setName] = useState ("Login")

    function handleClick () {
        if (hidden === "") {
            setHidden ("hidden");
            setName ("Login");
            setRegister ("")
        } else {
            setHidden ("")
            setName ("Log out")
            setRegister ("hidden")
        };
    }

    return (
      <section className="bg-white h-[89px] flex justify-between  px-10 py-4 items-center font-[Inter] fixed w-full border-b border-slate-200">
          <div>
              <a href="#"><img src={logo} alt="green logo with a jar and 3 leafs" /></a>
          </div>
          <nav>
            <ul className="flex justify-between gap-4 p-4 font-light text-slate-500">
                <li className=" hover:text-emerald-700 hover:font-normal transition"><a href="#" >Home</a></li>
                <li className={`${hidden} hover:text-emerald-700 hover:font-normal transition`}><a href="#">Products</a></li>
                <li className={`${hidden} hover:text-emerald-700 hover:font-normal transition`}><a href="#">About me</a></li>
            </ul>
          </nav>
          <div className="flex gap-10 font-semibold">
            <button className={`text-slate-900 ${register} cursor-pointer hover:underline hover:text-slate-600 transition`}>Register</button>
            <button onClick={handleClick} className={`text-white bg-emerald-900 px-10 py-3 rounded-xl  cursor-pointer hover:bg-emerald-700 transition`}>{name}</button>
          </div>
      </section>
    )
  }
  