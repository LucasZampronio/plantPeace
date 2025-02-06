import './App.css'
import PlantsEditPage from './pages/PlantsEditPage';
import PlantsRegisterPage from './pages/PlantsRegisterPage'
import Fourth from './components/HomePage/FourthSection'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { TempLoginPage } from './pages/TempLoginPage';
import { TempHomePage } from './pages/TempHomePage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* rotas publicas */}
        {/* Rota temporária de login */}
        <Route path="/sign-in" element={<TempLoginPage />} />
        {/* Rota temporária de home */}
        <Route path="/" element={<TempHomePage />} />

        <Route path="/carroussel" element={<Fourth />} />




        {/* ROTAS PROTEGIDAS */}

        {/* rota de registro de planta */}
        {/* http://localhost:5173/plants/register */}
        <Route
          path="/plants/register"
          element={
            <SignedIn>
              <PlantsRegisterPage />
            </SignedIn>
          }
        />

        {/* rota de edição de planta */}
        {/* http://localhost:5173/plants/edit */}
        <Route
          path="/plants/:id"
          element={
            <SignedIn>
              <PlantsEditPage />
            </SignedIn>
          }
        />

        

        {/* Nova rota de erro para usuários autenticados */}
        <Route
          path="*"
          element={
            <SignedIn>
              <ErrorPage /> {/* Página de erro personalizada */}
            </SignedIn>
          }
        />

        {/* Redirecionamento para não autenticados */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </Router>
  );
}

export default App
