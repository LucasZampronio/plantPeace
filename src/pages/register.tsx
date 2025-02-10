import React, { useState } from 'react';
import PlantImage from '/home/fernando/Área de trabalho/Trabalho/src/images/defautplant.png';
import LogoImage from '/home/fernando/Área de trabalho/Trabalho/src/images/logoicon.svg';

interface RegisterFormProps {
  onSubmit?: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit = () => {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    let newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!formData.name) {
      newErrors.name = 'Nome é Obrigatório';
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = 'Email é Obrigatório';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Esse Email é inválido';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Senha é Obrigatório';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não são iguais';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center pt-16 absolute left-[161px] top-[182px]">
      <div className="absolute right-0  gap-1 mb-8">
        <img src={LogoImage} alt="Logo" className="w-[43px] h-[36px]" />
        <span className="text-[#064e3b] font-['Oswald'] text-sm">plantPeace</span>
      </div>

      <div className="w-[424px] flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <h1 className="text-[40px] font-bold text-[#064e3b] font-['Playfair_Display']">
            Register
          </h1>
          <p className="text-base text-[#64748b]">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[#334155] font-medium">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full p-3 bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-[#64748b]"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#334155] font-medium">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full p-3 bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-[#64748b]"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#334155] font-medium">Senha</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-3 bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-[#64748b]"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#334155] font-medium">Confirme a Senha</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-3 bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-[#64748b]"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#064e3b] text-[#fcfcfc] py-3 px-10 rounded-lg font-semibold hover:bg-[#053e2f] transition-colors"
          >
            Se cadastre
          </button>
        </form>
      </div>

      <div className="fixed right-0 top-0 h-screen w-[704px] h-[1024]">
        <img
          src={PlantImage}
          alt="Decorative"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};