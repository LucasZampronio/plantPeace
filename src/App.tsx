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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <RegisterForm onSubmit={handleSignUp} />
    </div>
  );
}

export default App;