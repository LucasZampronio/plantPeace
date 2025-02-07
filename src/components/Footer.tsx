import logo from "../images/white-logo.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <section className="h-[422px] font-[Inter] font-normal text-sm bg-emerald-900 text-white flex flex-col p-20 gap-12 bg-[url(src/images/backgroundfooter.svg)]">
      <div className="flex place-content-between">
        <div className="flex flex-col gap-4">
          <h1 className="font-[Playfair_Display] font-bold text-[40px]">
            Stay Fresh
          </h1>
          <p>compassinhos@gmail.com</p>
          <p>+55 41 99999-9999</p>
        </div>
        <div className="flex gap-24">
          <nav>
            <ul className="flex flex-col gap-4">
              <li className="font-bold text-2xl pb-4">Links</li>
              <li className="hover:underline transition">
                <Link to="/about-us">About us</Link>
              </li>
            </ul>
          </nav>
          <nav>
            <ul className="flex flex-col gap-4">
              <li className="font-bold text-2xl pb-4">Community</li>
              <li className="hover:underline transition">
                <a href="https://www.linkedin.com/" target="_blank">
                  LinkedIn
                </a>
              </li>
              <li className="hover:underline transition">
                <a href="https://www.instagram.com/" target="_blank">
                  Instagram
                </a>
              </li>
              <li className="hover:underline transition">
                <a href="https://www.facebook.com/" target="_blank">
                  Facebook
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex place-content-between items-center pt-7 border-t border-emerald-950">
        <a href="#">
          <img src={logo} alt="white logo with a jar and 3 leafs" />
        </a>
        <p>Compassinhos®. All rights reserved.</p>
      </div>
    </section>
  );
};
