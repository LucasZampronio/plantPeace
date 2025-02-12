import logo from "../images/white-logo.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <section
      className="bg-emerald-900 text-white font-[Inter] font-normal text-sm bg-cover bg-center 
      p-6 lg:p-20 flex flex-col gap-8 lg:gap-12 
      min-h-auto lg:h-[422px]"
    >
      {/* Seção superior */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Informações de Contato */}
        <div className="flex flex-col gap-4">
          <h1 className="font-[Playfair_Display] font-bold text-3xl lg:text-[40px]">
            Stay Fresh
          </h1>
          <p>compassinhos@gmail.com</p>
          <p>+55 41 99999-9999</p>
        </div>
        {/* Menus de Navegação */}
        <div className="flex flex-col sm:flex-row gap-8 lg:gap-24">
          <nav>
            <ul className="flex flex-col gap-4">
              <li className="font-bold text-xl lg:text-2xl pb-2 lg:pb-4">Links</li>
              <li className="hover:underline transition">
                <Link to="/about-us">About us</Link>
              </li>
            </ul>
          </nav>
          <nav>
            <ul className="flex flex-col gap-4">
              <li className="font-bold text-xl lg:text-2xl pb-2 lg:pb-4">Community</li>
              <li className="hover:underline transition">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li className="hover:underline transition">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li className="hover:underline transition">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Seção inferior */}
      <div className="flex flex-col lg:flex-row justify-between items-center pt-4 lg:pt-7 border-t border-emerald-950">
        <a href="/">
          <img
            src={logo}
            alt="white logo with a jar and 3 leafs"
            className="h-12 lg:h-auto"
          />
        </a>
        <a href="*"><p className="text-center">Compassinhos®. All rights reserved.</p></a>
      </div>
    </section>
  );
};
