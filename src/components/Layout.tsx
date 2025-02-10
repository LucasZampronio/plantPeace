import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-grow bg-white dark:bg-neutral-900">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
