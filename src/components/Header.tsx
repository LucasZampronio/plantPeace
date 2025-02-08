import { useAuth, useUser } from "@clerk/clerk-react"
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logoicon.svg";



export const Header = () => {


  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleAuthAction = async () => {
    if (isSignedIn) {
      await signOut();
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <section className=' bg-white h-[89px] flex justify-between px-10 py-4 items-center font-[Inter] fixed w-full border-b border-slate-200 z-[100]`}'>
      <div>
        <Link to="/">
          <img src={logo} alt="green logo with a jar and 3 leafs" />
          
        </Link>
      </div>
      {/* Links de navegação */}
      <nav>
        <ul className="flex gap-4 p-4 font-light text-slate-500">
          <li className="hover:text-emerald-700 hover:font-normal transition">
            <Link to="/">Home</Link>
          </li>

          {/* Mostrar apenas quando logado */}
          {isSignedIn && (
            <>
              <li className="hover:text-emerald-700 hover:font-normal transition">
                <Link to="/plants/list">Products</Link>
              </li>
              <li className="hover:text-emerald-700 hover:font-normal transition">
                <Link to="/user/config">About me</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Seção de autenticação */}
      <div className="flex gap-10 font-semibold items-center">
        {!isSignedIn && (
          <Link
            to="/sign-up"
            className="text-slate-900 cursor-pointer hover:underline hover:text-slate-600 transition"
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
    </section>
  );
};
export default Header;
