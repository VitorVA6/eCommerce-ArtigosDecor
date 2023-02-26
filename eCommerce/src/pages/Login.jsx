import React from 'react'

export default function Login() {
  return (
    <section className='flex w-screen h-screen justify-center items-center'>
        <form className='flex w-1/3 flex-col'>
            <h2 className='text-xl font-semibold text-center mb-6'>Entre na sua conta</h2>
            <div className='flex gap-2 mb-4 flex-col'>
                <h3 className='text-sm font-medium'>E-mail</h3>
                <input className='border-b outline-none focus:border-black py-1 text-sm' type="text" placeholder='Digite seu e-mail' />
            </div>            
            <div className='flex gap-2 mb-4 flex-col'>
                <h3 className='text-sm font-medium'>E-mail</h3>
                <input className='border-b outline-none focus:border-black py-1 text-sm' type="text" placeholder='Mínimo de 6 caracteres' />
            </div>
            <button className='bg-blue-500 text-white w-full rounded-lg py-3 text-sm font-medium'>Entrar</button>
        </form>
    </section>
  )
}
