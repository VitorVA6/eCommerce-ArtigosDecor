import React from 'react'

export default function Requests() {
  return (
    <section className='flex items-center flex-col w-full h-screen'>
      <div className='flex flex-col w-full lg:w-3/4 bg-white py-8 rounded-2xl border border-gray-300/80 lg:border-gray-200/70'>
        <div className='flex flex-col border-b px-4 lg:px-7'>
            <h2 className='font-medium text-[22px]'>Pedidos recebidos</h2>
            <p className='text-gray-400 text-sm -mt-0.5 mb-3'>Aqui são exibidos seus pedidos recebidos</p>
            <button className='bg-transparent text-blue-500 text-[15px] font-medium w-fit mb-4'>+ Adicionar pedido</button>
        </div>
        <div className='flex w-full border-b px-4 lg:px-7 py-5 justify-between'>
            <div className='flex flex-col gap-1 w-fit'>
                <div className='flex gap-2'>
                    <h3 className='text-sm text-gray-500'>Renan Barbosa Martins</h3>
                    <h3 className='text-gray-400 text-sm'>R$342.00</h3>
                </div>
                <p className='text-xs text-gray-400'>16 de junho de 2023 às 13:07h</p>
            </div>
            <h3 className='flex items-center text-[12.5px] h-fit py-2 text-blue-500 px-3.5 rounded-lg bg-blue-50/90 w-fit'>Pago via Mercado Pago</h3>
        </div>
        <div className='flex w-full border-b px-4 lg:px-7 py-5 justify-between'>
            <div className='flex flex-col gap-1 w-fit'>
                <div className='flex gap-2'>
                    <h3 className='text-sm text-gray-500'>Renan Barbosa Martins</h3>
                    <h3 className='text-gray-400 text-sm'>R$342.00</h3>
                </div>
                <p className='text-xs text-gray-400'>16 de junho de 2023 às 13:07h</p>
            </div>
            <h3 className='flex items-center text-[12.5px] h-fit py-2 text-blue-500 px-3.5 rounded-lg bg-blue-50/90 w-fit'>Pago via Mercado Pago</h3>
        </div>
        
      </div>
      
      
    </section>
  )
}
