import { useAuth, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logoicon.svg";
import DarkMode from '../components/DarkMode';

export const Header = () => {

  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAuthAction = async () => {
    if (isSignedIn) {
      await signOut();
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-neutral-900 h-[89px] flex justify-between items-center px-10 py-4 font-[Inter] fixed w-full border-b border-slate-200 dark:border-gray-500 z-50" data-theme='dark'>
      
      {/* Logo */}
      <div>
        <Link to="/">
          <img src={logo} alt="green logo with a jar and 3 leafs" />
        </Link>
      </div>
      <DarkMode />
      {/* Desktop navigation menu */}
      <nav className="hidden lg:flex">
        <ul className="flex gap-4 p-4 font-light text-slate-500 dark:text-slate-400">
          <li className="text-emerald-900 font-normal hover:text-emerald-800 hover:font-bold transition duration-300 dark:text-emerald-700 dark:hover:text-emerald-600">
            <Link to="/">Home</Link>
          </li>
          {isSignedIn && (
            <>
              <li className="hover:text-emerald-800 text-emerald-900 font-normal hover:font-bold transition">
                <Link to="/plants/list">Products</Link>
              </li>
              <li className="hover:text-emerald-800 text-emerald-900  font-normal hover:font-bold transition">
                <Link to="/user/config">About me</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Seção de autenticação para desktop */}
      <div className="hidden lg:flex gap-10 font-semibold items-center">
        {!isSignedIn && (
          <Link
            to="/sign-up"
            className="text-slate-900 cursor-pointer hover:underline hover:text-slate-600 transition dark:text-slate-500 dark:hover:text-emerald-700 dark:"
          >
            Register
          </Link>
        )}
        {isSignedIn && (
          <div className="flex items-center gap-4">
            <span className="text-emerald-900">Hi, {user?.firstName}</span>
          </div>
        )}
        <button
          onClick={handleAuthAction}
          className="text-white bg-emerald-900 px-10 py-3 rounded-xl cursor-pointer hover:bg-emerald-700 transition"
        >
          {isSignedIn ? "Log out" : "Login"}
        </button>
      </div>

      {/* Botão de menu hambúrguer para mobile */}
      <div className="lg:hidden">
        <button onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
          {isMobileMenuOpen ? (
            // Ícone X para fechar
            <svg
              className="w-8 h-8 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Ícone hambúrguer
            <svg
              className="w-8 h-8 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
  <div className="lg:hidden absolute top-[89px] inset-x-0 bg-white dark:bg-neutral-900 shadow-md z-40 transition-all duration-300">
    <ul className="flex flex-col gap-4 p-4 font-light text-slate-500 dark:text-slate-400">
      <li className="hover:text-emerald-700 dark:hover:text-emerald-600 hover:font-normal transition">
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
          Home
        </Link>
      </li>
      {isSignedIn && (
        <>
          <li className="hover:text-emerald-700 dark:hover:text-emerald-600 hover:font-normal transition">
            <Link to="/plants/list" onClick={() => setIsMobileMenuOpen(false)}>
              Products
            </Link>
          </li>
          <li className="hover:text-emerald-700 dark:hover:text-emerald-600 hover:font-normal transition">
            <Link to="/user/config" onClick={() => setIsMobileMenuOpen(false)}>
              About me
            </Link>
          </li>
        </>
      )}
      <li className="pt-4 border-t border-slate-200 dark:border-gray-500">
        {!isSignedIn && (
          <Link
            to="/sign-up"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-slate-900 dark:text-slate-300 cursor-pointer hover:underline hover:text-slate-600 transition"
          >
            Register
          </Link>
        )}
        <button
          onClick={() => {
            handleAuthAction();
            setIsMobileMenuOpen(false);
          }}
          className="w-full text-left mt-2 text-white bg-emerald-900 dark:bg-emerald-950 px-4 py-2 rounded-xl cursor-pointer hover:bg-emerald-700 dark:hover:bg-emerald-900 transition"
        >
          {isSignedIn ? "Log out" : "Login"}
        </button>
      </li>
    </ul>
  </div>
)}
    </header>
  );
};
