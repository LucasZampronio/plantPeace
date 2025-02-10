import React, { useState, useCallback } from 'react';
import PlantImage from '/home/fernando/Área de trabalho/Trabalho/src/images/defautplant.png';
import LogoImage from '/home/fernando/Área de trabalho/Trabalho/src/images/logoicon.svg';  

interface SignUpFormProps {
  onSubmit?: (email: string, password: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit = () => {} }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayConnected, setStayConnected] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  }, [email, password, onSubmit]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-16">
        <div className="mt-4">
          <img 
            src={LogoImage} 
            alt="Logo"
            className="w-12 h-12"
          />
        </div>

        <div className="max-w-lg mx-auto mt-48 flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl text-green-900 mb-2">Entre</h1>
              <p className="text-gray-500">São mais 300 plantas pra você.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-gray-500">E-mail</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="p-3 border border-gray-300 rounded-md text-lg"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm text-gray-500">Senha</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="p-3 border border-gray-300 rounded-md text-lg"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="stay-connected"
                  type="checkbox"
                  checked={stayConnected}
                  onChange={(e) => setStayConnected(e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
                <label htmlFor="stay-connected" className="text-sm text-gray-500">Ficar Conectado</label>
              </div>

              <button
                type="submit"
                className="bg-green-900 text-white p-3 rounded-md text-lg cursor-pointer transition hover:bg-green-700"
              >
                Cadastre-se
              </button>
            </form>
          </div>
        </div>
      </div>

      <div 
        className="flex-1 bg-cover bg-center" 
        style={{ backgroundImage: `url(${PlantImage})` }}
      />
    </div>
  );
};

export default SignUpForm;