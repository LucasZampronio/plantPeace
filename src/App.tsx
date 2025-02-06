import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PlantsRegisterPage from "./pages/PlantsRegisterPage";
import PlantsEditPage from "./pages/PlantsEditPage";
import ErrorPage from "./pages/ErrorPage";
// import SignInPage from "./pages/SignInPage";
// import SignUpPage from "./pages/SignUpPage";

// componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

// configurando roteador (aqui define as rotas da aplicacao)
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // rota pública
      { index: true, element: <HomePage /> },

      // rotas protegidas
      {
        path: "/plants/register",
        element: (
          <ProtectedRoute>
            <PlantsRegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/plants/:id",
        element: (
          <ProtectedRoute>
            <PlantsEditPage />
          </ProtectedRoute>
        ),
      },

      // rota de erro
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  // rotas de autenticação fora do Layout
  {
    path: "/sign-in",
    element: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
