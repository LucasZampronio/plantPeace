// src/pages/TempLoginPage.tsx
import { SignIn } from "@clerk/clerk-react";

export const TempLoginPage = () => {
    console.log("Renderizando TempLoginPage...");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignIn />
    </div>
  );
};
