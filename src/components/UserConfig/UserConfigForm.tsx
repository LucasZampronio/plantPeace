import { useState, useEffect } from "react";

import plant from "../../images/defautplant.png";

interface UserConfigFormProps {
  user?: {
    nome: string;
    email: string;
    senha: string;
  };
  onSubmit: (usuario: { nome: string; email: string; senha: string }) => void;
}

const UserConfigForm: React.FC<UserConfigFormProps> = ({
  user,
  onSubmit,
}) => {
  const [nome, setNome] = useState<string>(user?.nome || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [senha, setSenha] = useState<string>(user?.senha || "");

  // Usado para lidar com mudanças nos campos do formulário
  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Chama a função de onSubmit passando os dados atualizados
    onSubmit({ nome, email, senha });
  };

  // UseEffect para garantir que os campos sejam atualizados quando `initialData` mudar
  useEffect(() => {
    console.log("Dados recebidos no formulário:", user);
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      setSenha(user.senha);
    }
  }, [user]);

  return (
    <section className="bg-white flex h-screen">
      {/*DIV ESQUERDA FORMULARIO*/}
      <div className="flex flex-1 flex-col pt-30 items-left justify-start w-full">
        {/*TITULO FORMULARIO*/}
        <div className="border-green-500 w-[70%] pl-15 pr-10 pb-10">
          <h1 className="text-4xl font-bold mb-3 text-[#064E3B]">User config</h1>
          <p className="text-[#64748B]">
            Lorem ipsum dolor sit amet consectetur. Turpis vitae at et massa
            neque.
          </p>
        </div>
        {/*FORMULARIO*/}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 rounded-2xl bg-white  w-full pl-15 pr-10"
        >
          {/*CAMPO DE NOME*/}
          <label htmlFor="nome">Name</label>
          <input
            type="text"
            value={nome}
            placeholder="Name"
            onChange={handleNomeChange}
            className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"
          />
          {/*CAMPO DE EMAIL*/}
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
            className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"
          />
          {/*CAMPO DE SENHA*/}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={senha}
            placeholder="***********"
            onChange={handleSenhaChange}
            className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"
          />
          {/*BOTÃO DE ENVIAR*/}
          <button className="mt-4 py-2 px-6 bg-[#064E3B] text-white rounded-lg hover:bg-[#267355] transition-colors">
            Edit account
          </button>
        </form>
      </div>
      {/*IMAGEM DA DIREITA*/}
      <div className="flex flex-1">
        <img
          src={plant}
          alt="Uma planta"
          className="flex-1 hidden md:flex object-cover w-full h-full object-[center_50%] z-1"
        />
      </div>
    </section>
  );
};

export default UserConfigForm;
