import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

// todas as configuracoes globais, de mais alto nivel devem ser configuradas aqui
// providers de contexto, temas e etc...

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      {/* tudo dentro do app tem acesso ao clerk */}
      <App />
    </ClerkProvider>
  </StrictMode>
);
