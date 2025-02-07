import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PlantsRegisterPage from "./pages/PlantsRegisterPage";
import PlantsEditPage from "./pages/PlantsEditPage";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PlantListPage from "./pages/PlantsListPage";
import UserConfigPage from "./pages/UserConfigPage";

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
      {
        path: "/plants/list",
        element: (
          <ProtectedRoute>
            <PlantListPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "/user/config",
        element: (
          <ProtectedRoute>
            <UserConfigPage />
          </ProtectedRoute>
        ),
      },

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
  // rotas de autenticação fora do layout (que nao tem a header e o footer, ou seja, page de login e cadastro)
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <RegisterPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
