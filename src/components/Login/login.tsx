import React from "react";
import PlantImage from "../../images/defautplant.png";
import { useForm } from "../../hooks/useForm"; // Importe o hook
import LogoImage from "../../images/logoicon.svg";
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
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          errors.email = "Email inválido";
        }

        if (!data.password) {
          errors.password = "Senha is required";
        }

        return errors;
      },
    });

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-gray-100">
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10">
        <div className="absolute top-4 left-4">
          <a href="/">
            <img src={LogoImage} alt="Logo" className="w-10 h-10" />
          </a>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-md">
          <div>
            <h1 className="text-3xl md:text-4xl text-green-900 mb-2 font-[Playfair_Display] font-bold">
              Sign up
            </h1>
            <p className="text-gray-500 text-sm font-[Inter]">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm text-[#334155] font-[Inter]"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full p-2 bg-[#ebf0f5] border border-[#e2e8f0] rounded-lg text-[#64748b]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm text-[#334155] font-[Inter]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-2 bg-[#ebf0f5] border border-[#e2e8f0] rounded-lg text-[#64748b]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                id="stay-connected"
                type="checkbox"
                name="stayConnected"
                checked={formData.stayConnected}
                onChange={handleChange}
                className="w-4 h-4 cursor-pointer"
              />
              <label
                htmlFor="stay-connected"
                className="text-sm text-gray-500 font-[Inter]"
              >
                Stay connected
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#064e3b] text-[#fcfcfc] py-2 rounded-lg font-semibold hover:bg-[#053e2f] transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex flex-1">
        <img
          src={PlantImage}
          alt="Decorative"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginForm;
