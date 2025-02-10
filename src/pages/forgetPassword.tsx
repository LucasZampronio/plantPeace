import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import foto from "/home/fernando/Área de trabalho/Trabalho/src/images/forest-bg.png";
import logo from "/home/fernando/Área de trabalho/Trabalho/src/images/logoicon.svg";
import cacto from "/home/fernando/Área de trabalho/Trabalho/src/images/Cacto.png";
import cactobg from "/home/fernando/Área de trabalho/Trabalho/src/images/bgcacto.png";

interface ForgotPasswordProps {
  onSubmit?: (email: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSubmit = () => {},
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="flex h-[100%] flex-col items-center bg-white relative overflow-hidden">
      <Helmet>
        <title>Forgot Password - plantPeace</title>
      </Helmet>
      <div className="absolute top-5 right-310 ">
          <img src={logo} alt="Logo" className="w-12 h-12" />
      </div>


      <div className="absolute top-5 right-9">
        <a href="/">
        <button className="bg-green-900 text-white px-8 py-4 rounded-md text-sm font-semibold">
          Log in
        </button>
        </a>
      </div>


      <div className="bg-white rounded-lg p-20 w-[100%] max-w-lg mt-34 flex flex-col gap-8 shadow-lg z-10">

        <div className="relative text-center">
            <img
                src={cactobg}
                alt="Cacto Background"
                className="w-32 h-32 mx-auto z-10"
            />
            <img
                src={cacto}
                alt="Logo"
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 z-0"
            />
        </div>
        
        <h1 className="text-3xl font-medium text-green-900 text-center">
          Forgot password
        </h1>
        <p className="text-gray-600 text-center text-sm leading-6">
          Enter your email for the verification process. We will send a 4-digit
          code to your email.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-green-900 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-900"
            />
          </div>

          <button
            type="submit"
            disabled={!email}
            className={`px-6 py-4 rounded-md text-white font-bold uppercase transition ${
              email ? "bg-green-900 hover:bg-green-900" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </form>
      </div>

      <img
        src={foto}
        alt="Background decoration"
        className="absolute bottom-0 w-full z-0"
      />
    </div>
  );
};
