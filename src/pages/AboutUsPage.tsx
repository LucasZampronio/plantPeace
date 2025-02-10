import React from "react";
import { Helmet } from 'react-helmet';
import photo01 from "../images/photo-dan.jpg";
import { TeamCard } from "../components/TeamCard";

export const AboutUsPage = () => {
  return (
    <main className="font-[Inter] text-slate-500 px-6 sm:px-10 pt-24 pb-12 grid gap-y-10">
        <Helmet>
          <title>About Us - plantPeace</title>
        </Helmet>
      <section className="grid gap-y-6">
        <h1 className="font-[Playfair_Display] font-bold text-4xl sm:text-5xl text-emerald-900">About Us</h1>
        <p className="text-base sm:text-lg">Welcome to our "About Us" page! We are a team of five internship colleagues united by our passion for technology and our desire to learn, grow, and contribute to innovative projects. Each of us brings unique skills and perspectives, allowing us to work collaboratively and efficiently.</p>
      </section>
      <section className="grid gap-y-6">
        <h1 className="font-[Playfair_Display] font-bold text-4xl sm:text-5xl text-emerald-900">Our Mission</h1>
        <p className="text-base sm:text-lg">Our goal is to develop creative solutions, learn through hands-on experience and contribute to the company. We believe that teamwork and knowledge sharing are key to achieving exceptional results.</p>
      </section>
      <section className="grid gap-y-6">
        <h1 className="font-[Playfair_Display] font-bold text-4xl sm:text-5xl text-emerald-900">Meet the Team</h1>
        <p className="text-base sm:text-lg">Here’s a little about each of us:</p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10 py-12">
        <TeamCard name="Daniel Fernandes da Silva" photo={photo01} github="https://github.com/daniscotti" linkedin="https://www.linkedin.com/in/danfdasilva/" />
        <TeamCard name="Fernando Glaesser da Silva" photo={photo01} github="https://github.com/daniscotti" linkedin="" />
        <TeamCard name="Lucas Zampronio da Silva" photo={photo01} github="https://github.com/daniscotti" linkedin="" />
        <TeamCard name="Manuella da Silva Rodrigues" photo={photo01} github="https://github.com/daniscotti" linkedin="" />
        <TeamCard name="Marcus Vinicius Do Prado" photo={photo01} github="https://github.com/daniscotti" linkedin="" />
        <div className="flex flex-col items-center gap-6 pt-6">
          <h2 className="font-semibold text-center text-xl sm:text-2xl text-slate-900 dark:text-white">Edson Moreira da Costa Filho</h2>
          <p>Instructor</p>
          <h2 className="font-semibold text-center text-xl sm:text-2xl text-slate-900 dark:text-white">Hewerton Adão da Paz</h2>
          <p>Instructor</p>
          <h2 className="font-semibold text-center text-xl sm:text-2xl text-slate-900 dark:text-white">Jailson de Souza</h2>
          <p>Instructor and PO</p>
        </div>
      </section>
      <section className="grid gap-y-6">
        <h1 className="font-[Playfair_Display] font-bold text-4xl sm:text-5xl text-emerald-900">Our Commitment</h1>
        <p className="text-base sm:text-lg">We are committed to learning from every challenge and contributing to the team's success. We believe this internship experience is a unique opportunity for professional and personal growth.</p>
      </section>
      <section className="grid gap-y-6">
        <h1 className="font-[Playfair_Display] font-bold text-4xl sm:text-5xl text-emerald-900">Thank You</h1>
        <p className="text-base sm:text-lg">We are grateful for the opportunity to be part of this project and are excited for what’s to come!</p>
      </section>
    </main>
  );
};
