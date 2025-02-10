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
import { Link } from "react-router-dom";

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit = () => {}, error }) => {
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
        <div className="absolute top-10 left-9">
          <a href="/">
            <img src={LogoImage} alt="Logo" className="w-12 h-12" />
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
              <p className="text-sm text-blue-500 hover:underline mt-1">
                <Link to="/forgot-password">Forgot your password?</Link>
              </p>
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
            {error && (
              <div
                className="mt-2 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md 
                          flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}
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
