import './edit.css'      
{/*Vou usar inline mesmo*/} 
import { useEffect,useState } from 'react';

const edit: React.FC<{usuarioid:number}> = ({usuarioid}) => {
  /*Ao inves de criar, buscar por id e renomear os dados*/
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  useEffect(() =>{
    const fetchusuarioData = async () => {
      const respons = await fetch(`http://localhost:3001/usuarios/${usuarioid}}`)
      if (respons.ok){
        const data = await respons.json()
        setNome(data.nome)
        setEmail(data.email)
        setSenha(data.senha)
      } else{
        alert('Não buscou o id do clerk')
      }
    }
    fetchusuarioData();

  },[usuarioid]);
 
  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };


  const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usuario = { nome, email, senha }; 
      {/*API*/} 
    const response = await fetch('http://localhost:3001/usuarios{$userid}', {
      //Mudar a requisição depois
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario), 
    });

  
    if (response.ok) {
      const data = await response.json(); 
      alert(`Usuário atualizado: ${data.nome} Email:${data.email} Senha:${data.senha}`); 
    } else {
     
      alert('Erro ao atualizar'); 
    }
  };



  return (
    
      <section className="bg-white flex h-screen">  
      {/*DIV ESQUERDA FORMULARIO*/} 
        <div className='<div className="flex flex-1 flex-col pt-6 items-start w-full  ">'>
          {/*TITULO FORMULARIO*/}
          <div className='border-green-500 w-[70%] pl-15 pr-10 pb-10'>
            <h1 className="text-5xl mb-3 text-[#064E3B]">User config</h1>
            <p className='text-[#64748B]'>Lorem ipsum dolor sit amet consectetur. Turpis vitae at et massa neque.</p>
          </div>
        {/*FORMULARIO*/}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded-2xl bg-white mt-10x   w-full  pl-15 pr-10" >
            {/*CAMPO DE NOME*/}
            <p>Name</p>
            <input type="name" value={nome} placeholder="Echinocereus Cactus" onChange={handleNomeChange}className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"/>
            {/*CAMPO DE EMAIL*/}
            <p>E-mail</p>
            <input type="e-mail" value={email} placeholder="A majestic addition to your plant collection" onChange={handleEmailChange} className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"/>
            {/*CAMPO DE SENHA*/}
            <p>Password</p>
            <input type="password" value={senha} placeholder="***********" onChange={handleSenhaChange} className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"/>
            {/*BOTÃO DE ENVIAR*/}
            <button type='submit' className="mt-4 py-2 px-6 bg-[#064E3B] text-white rounded-lg hover:bg-[#267355] transition-colors"> Edit account</button>
          </form>
        </div>
        {/*IMAGEM DA DIREITA*/}
        <div className='flex flex-1'>
          <img src="src/images/defautplant.png"alt="Uma planta"className="flex-1 hidden md:flex object-cover w-full h-full max-h-[800px] object-[center_80%] z-1" />
        </div>
      </section>
  )
}

export default edit;
