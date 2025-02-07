import React from "react";
import PlantImage from "../../images/defautplant.png";
import LogoImage from "../../images/green-logo.png";
import { useForm } from "../../hooks/useForm"; // Importe o hook

interface LoginFormData {
  email: string;
  password: string;
  stayConnected: boolean;
  [key: string]: string | boolean;
}

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit = () => {} }) => {
  const { formData, errors, handleChange, handleSubmit } =
    useForm<LoginFormData>({
      initialValues: {
        email: "",
        password: "",
        stayConnected: false,
      },
      onSubmit,
      validate: (data) => {
        const errors: Record<string, string> = {};

        if (!data.email) {
          errors.email = "Email é obrigatório";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          errors.email = "Email inválido";
        }

        if (!data.password) {
          errors.password = "Senha é obrigatória";
        }

        return errors;
      },
    });

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* Logo no canto superior esquerdo */}
        <div className="absolute top-0 left-0 p-10">
          <a href="/">
            <img src={LogoImage} alt="Logo" className="w-12 h-12" />
          </a>
        </div>

        {/* Formulário */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-4xl text-green-900 mb-2 font-bold">
                Login
              </h1>
              <p className="text-gray-500 text-sm">
                São mais de 300 plantas para você.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 w-96 h-auto"
            >
              {/* Campo de email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-gray-500">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="p-3 border border-gray-300 rounded-md text-lg"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Campo de senha */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm text-gray-500">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="p-3 border border-gray-300 rounded-md text-lg"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Checkbox "Ficar Conectado" */}
              <div className="flex items-center gap-3">
                <input
                  id="stay-connected"
                  type="checkbox"
                  name="stayConnected"
                  checked={formData.stayConnected}
                  onChange={handleChange}
                  className="w-5 h-5 cursor-pointer"
                />
                <label
                  htmlFor="stay-connected"
                  className="text-sm text-gray-500"
                >
                  Ficar Conectado
                </label>
              </div>

              {/* Botão de submit */}
              <button
                type="submit"
                className="bg-green-900 text-white p-3 rounded-md text-lg cursor-pointer transition hover:bg-green-700"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Lado direito - Imagem */}
      <div className="flex-1">
        <img
          src={PlantImage}
          alt="Decorative"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default LoginForm;
