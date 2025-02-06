import './edit.css'
import { useState } from 'react';
const edit = () => {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit  = (event) => {
    event.preventDefault();

    alert('enviando os dados' + name +  email + password)

  };


  return (
    
      <section className="bg-white flex h-screen">  
      {/*DIV ESQUERDA FORMULARIO*/} 
        <div className='<div className="flex flex-1 flex-col pt-6 items-start w-full border-2 border-red-500 p-4">'>
          {/*TITULO FORMULARIO*/}
          <div className='border-green-500 w-[70%] pl-15 pr-10 pb-10'>
            <h1 className="text-5xl mb-3 text-[#064E3B]">User config</h1>
            <p className='text-[#64748B]'>Lorem ipsum dolor sit amet consectetur. Turpis vitae at et massa neque.</p>
          </div>
        {/*FORMULARIO*/}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded-2xl bg-white mt-10x   w-full border-2 border-blue-500 pl-15 pr-10" >
            {/*CAMPO DE NOME*/}
            <p>Name</p>
            <input type="name" placeholder="Echinocereus Cactus" onChange={(e) => setName(e.target.value)}className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"/>
            {/*CAMPO DE EMAIL*/}
            <p>E-mail</p>
            <input type="e-mail" placeholder="A majestic addition to your plant collection" onChange={(e) => setEmail(e.target.value)} className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"/>
            {/*CAMPO DE SENHA*/}
            <p>Password</p>
            <input type="password" placeholder="***********" onChange={(e) => setPassword(e.target.value)} className="mt- py-2 px-6 bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] border-2 placeholder-[#64748B] rounded-lg"/>
            {/*BOTÃO DE ENVIAR*/}
            <button className="mt-4 py-2 px-6 bg-[#064E3B] text-white rounded-lg hover:bg-[#267355] transition-colors"> Edit account</button>
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
