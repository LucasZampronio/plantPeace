import photo01 from "../images/defautplant.png"
import { TeamCard } from "../components/TeamCard"

export const AboutUsPage = () => {
  return (
    <main className="bg-emerald-50 font-[Inter] text-slate-500 grid grid-cols-3 h-dvw justify-items-center px-[5%] pt-[10%] pb-[5%]">
        <div className="col-span-3">
            <h1 className="font-[Playfair_Display] font-bold text-6xl text-emerald-900">Conheça a nossa equipe</h1>
        </div>
        <TeamCard name="Daniel Fernandes da Silva" photo={photo01} github="https://github.com/daniscotti" linkedin="https://www.linkedin.com/in/danfdasilva/" />
        <TeamCard name="Fernando Glaesser da Silva" photo={photo01} github="https://github.com/daniscotti" linkedin=""/>
        <TeamCard name="Lucas Zampronio da Silva" photo={photo01} github="https://github.com/daniscotti" linkedin=""/>
        <TeamCard name="Manuella da Silva Rodrigues" photo={photo01} github="https://github.com/daniscotti" linkedin=""/>
        <TeamCard name="Marcus Vinicius Do Prado" photo={photo01} github="https://github.com/daniscotti" linkedin=""/>

    </main>
  )
}
