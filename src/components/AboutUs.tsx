import photo01 from "../images/defautplant.png"
import { TeamCard } from "./TeamCard"

export const AboutUs = () => {
  return (
    <main className="bg-emerald-50 font-[Inter] text-slate-500 grid grid-cols-3 h-dvw justify-items-center px-[5%] pt-[10%] pb-[5%]">
        <div className="col-span-3">
            <h1 className="font-[Playfair_Display] font-bold text-6xl text-emerald-900">Conheça a nossa equipe</h1>
        </div>
        <TeamCard name="Daniel" photo={photo01} github="https://github.com/daniscotti" linkedin="" />
        <TeamCard name="Fernando" photo={photo01} github="https://github.com/daniscotti" linkedin=""/>
        <TeamCard name="Lucas" photo={photo01} github="https://github.com/daniscotti" linkedin=""/>
        <TeamCard name="Manuella" photo={photo01} github="https://github.com/daniscotti" linkedin=""/>
        <TeamCard name="Marcus" photo={photo01} github="https://github.com/daniscotti" linkedin=""/>

    </main>
  )
}
