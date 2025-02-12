import { useAuth, useUser } from "@clerk/clerk-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logoicon.svg";
import DarkMode from "../components/DarkMode";
import { useEffect, useRef } from "react";

export const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string, exact = false) => {
    return exact
      ? location.pathname === path
      : location.pathname.startsWith(path);
  };

  const handleAuthAction = async () => {
    if (isSignedIn) {
      await signOut();
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerHeight}px`
      );
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const linkBaseClass = "transition duration-300 font-normal";

  const desktopLinkClass = (path: string, exact = false) => `
    ${linkBaseClass}
    ${isActive(path, exact)
      ? "text-emerald-900 dark:text-emerald-500 font-medium"
      : "text-slate-500 dark:text-slate-400 hover:text-emerald-800 dark:hover:text-emerald-500"
    }
  `;

  const mobileLinkClass = (path: string, exact = false) => `
    ${linkBaseClass}
    ${isActive(path, exact)
      ? "text-emerald-700 dark:text-emerald-500 font-medium"
      : "text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-500"
    }
  `;

  return (
    <header
      ref={headerRef}
      className="bg-white dark:bg-neutral-900 flex justify-between items-center px-10 py-4 font-[Inter] fixed w-full border-b border-slate-200 dark:border-gray-500 z-50"
      data-theme="dark"
    >
      <div className="flex">
        <Link to="/" className="flex">
          <img
            src={logo}
            alt="green logo with a jar and 3 leafs"
            className="pr-10"
          />
        </Link>
        <DarkMode />
      </div>

      <nav className="hidden lg:flex">
        <ul className="flex gap-4 p-4">
          <li>
            <Link
              to="/"
              className={desktopLinkClass("/", true)}
            >
              Home
            </Link>
          </li>
          {isSignedIn && (
            <>
              <li>
                <Link
                  to="/plants/list"
                  className={desktopLinkClass("/plants/list")}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/user/config"
                  className={desktopLinkClass("/user/config")}
                >
                  About me
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="hidden lg:flex gap-10 font-semibold items-center">
        {!isSignedIn && (
          <Link
            to="/sign-up"
            className="text-slate-900 cursor-pointer hover:underline hover:text-slate-600 transition dark:text-slate-500 dark:hover:text-emerald-700"
          >
            Register
          </Link>
        )}
        {isSignedIn && (
          <div className="flex items-center gap-4">
            <span className="text-emerald-900 dark:text-emerald-500">
              Hi, {user?.firstName}
            </span>
          </div>
        )}
        <button
          onClick={handleAuthAction}
          className="text-white bg-emerald-900 px-10 py-3 rounded-xl cursor-pointer hover:bg-emerald-700 transition dark:bg-emerald-950 dark:hover:bg-emerald-900"
        >
          {isSignedIn ? "Log out" : "Login"}
        </button>
      </div>

      <div className="lg:hidden">
        <button onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
          {isMobileMenuOpen ? (
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
          <ul className="flex flex-col gap-4 p-4">
            <li>
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={mobileLinkClass("/", true)}
              >
                Home
              </Link>
            </li>
            {isSignedIn && (
              <>
                <li>
                  <Link
                    to="/plants/list"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={mobileLinkClass("/plants/list")}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/config"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={mobileLinkClass("/user/config")}
                  >
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