<<<<<<< HEAD
import './App.css';
import {RegisterForm} from './pages/register.tsx'; 

function App() {
  const handleSignUp = (data: {
    name: string;
    email: string;
    password: string;

  }) => {
    console.log("Dados do formulário:", data);
  };
=======
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
import PlantDetail from "./pages/PlantsDetail";
>>>>>>> fernando-responsividade

// componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <RegisterForm onSubmit={handleSignUp} />
    </div>
  );
}

export default App;
=======
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

      {
        path: "/plants/detail/:id",
        element: (
          <ProtectedRoute>
            <PlantDetail />
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
>>>>>>> fernando-responsividade
