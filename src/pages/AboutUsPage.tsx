import photo01 from "../images/photo-dan.jpg"
import { TeamCard } from "../components/TeamCard"

export const AboutUsPage = () => {
  return (
    <main className="font-[Inter] text-slate-500 px-[5%] pt-[10%] pb-[7%] grid gap-y-7">
        <div className="col-span-3 grid gap-y-6">
            <h1 className="font-[Playfair_Display] font-bold text-5xl text-emerald-900">About Us</h1>
            <p>Welcome to our "About Us" page! We are a team of five internship colleagues united by our passion for technology and our desire to learn, grow, and contribute to innovative projects. Each of us brings unique skills and perspectives, allowing us to work collaboratively and efficiently.</p>
        </div>
        <div className="col-span-3 grid gap-y-6">
            <h1 className="font-[Playfair_Display] font-bold text-5xl text-emerald-900">Our Mission</h1>
            <p>Our goal is to develop creative solutions, learn through hands-on experience and contribute to the company. We believe that teamwork and knowledge sharing are key to achieving exceptional results.</p>
        </div>
        <div className="col-span-3 grid gap-y-6">
            <h1 className="font-[Playfair_Display] font-bold text-5xl text-emerald-900">Meet the Team</h1>
            <p>Here’s a little about each of us:</p>
        </div>
        <div className="grid grid-cols-3 col-span-3 justify-items-center gap-y-10 py-[30px]">
          <TeamCard name="Daniel Fernandes da Silva" photo={photo01} github="https://github.com/daniscotti" linkedin="https://www.linkedin.com/in/danfdasilva/" />
          <TeamCard name="Fernando Glaesser da Silva" photo={photo01} github="https://github.com/daniscotti" linkedin=""/>
          <TeamCard name="Lucas Zampronio da Silva" photo={photo01} github="https://github.com/daniscotti" linkedin=""/>
          <TeamCard name="Manuella da Silva Rodrigues" photo={photo01} github="https://github.com/daniscotti" linkedin=""/>
          <TeamCard name="Marcus Vinicius Do Prado" photo={photo01} github="https://github.com/daniscotti" linkedin=""/>
          <div className="flex flex-col items-center gap-4 pt-[10%]">
            <h2 className="font-semibold text-center text-2xl text-slate-900">Edson Moreira da Costa Filho</h2>
            <p>Instructor</p>
            <h2 className="font-semibold text-center text-2xl text-slate-900">Hewerton Adão da Paz</h2>
            <p>Instructor</p>
            <h2 className="font-semibold text-center text-2xl text-slate-900">Jailson de Souza</h2>
            <p>Instructor and PO</p>
          </div>
        </div>        
        <div className="col-span-3 grid gap-y-6">
            <h1 className="font-[Playfair_Display] font-bold text-5xl text-emerald-900">Our Commitment</h1>
            <p>We are committed to learning from every challenge and contributing to the team's success. We believe this internship experience is a unique opportunity for professional and personal growth.</p>
        </div>
        <div className="col-span-3 grid gap-y-6">
            <h1 className="font-[Playfair_Display] font-bold text-5xl text-emerald-900">Thank You</h1>
            <p>We are grateful for the opportunity to be part of this project and are excited for what’s to come!</p>
        </div>
    </main>
  )
}
