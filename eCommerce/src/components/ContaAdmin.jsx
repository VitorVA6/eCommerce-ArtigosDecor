import React from 'react'
import { FiLogOut } from "react-icons/fi";

export default function ContaAdmin() {
  return (
    <section className='flex items-center flex-col w-full overflow-auto pb-20'>
      <div className='flex flex-col w-3/5'>
        <h2 className='mb-3 font-medium text'>Dados cadastrais</h2>
        <form className='bg-white py-7 px-7 rounded-xl'>
          <div className='flex flex-col w-full gap-2 mb-5'>
            <h3 className='text-sm font-medium'>E-mail</h3>
            <input type="text" className='px-2 py-2.5 outline-none bg-gray-50 text-sm rounded-lg' placeholder='E-mail de cadastro' />
          </div>
          <button className='bg-blue-500 text-white w-full rounded-lg py-3 text-sm font-medium'>Salvar alterações</button>
        </form>
      </div>

      <div className='flex flex-col w-3/5 mt-4'>
        <h2 className='mb-3 font-medium text'>Alterar senha</h2>
        <form className='bg-white py-7 px-7 rounded-xl'>
          <div className='flex flex-col w-full gap-2 mb-5'>
            <h3 className='text-sm font-medium'>Senha atual</h3>
            <input type="text" className='px-2 py-2.5 outline-none bg-gray-50 text-sm rounded-lg' placeholder='Senha atual' />
          </div>
          <div className='flex flex-col w-full gap-2 mb-5'>
            <h3 className='text-sm font-medium'>Nova senha</h3>
            <input type="text" className='px-2 py-2.5 outline-none bg-gray-50 text-sm rounded-lg' placeholder='Nova senha' />
          </div>
          <div className='flex flex-col w-full gap-2 mb-5'>
            <h3 className='text-sm font-medium'>Confirmar nova senha</h3>
            <input type="text" className='px-2 py-2.5 outline-none bg-gray-50 text-sm rounded-lg' placeholder='Confirmar nova senha' />
          </div>
          <button className='bg-blue-500 text-white w-full rounded-lg py-3 text-sm font-medium'>Salvar alterações</button>
        </form>
      </div>

      <div className='flex flex-col w-3/5 mt-8'>
        <h3 className='font-medium mb-2'>Perdeu a senha?</h3>
        <p className='text-sm text-gray-400 mb-2'>Ao clicar no botão, uma nova senha será criada e enviada para o seu e-mail</p>
        <button className='bg-gray-200 text-sm w-full py-2.5 rounded-lg'>Perdi a senha</button>
      </div>
      <div className='flex flex-col w-3/5 mt-8 mb-16'>
        <h3 className='font-medium mb-2'>Sair da conta</h3>
        <button className='flex items-center gap-1 text-red-500 font-medium w-fit'>
          <FiLogOut className='w-5 h-5' />Sair
        </button>
      </div>
      
    </section>
  )
}
