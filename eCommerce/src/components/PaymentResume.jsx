import React from 'react'
import {IoTicketOutline} from 'react-icons/io5'

export default function PaymentResume() {
  return (
    <div className='flex flex-col bg-white px-6 py-7 rounded-lg shadow-md/90 h-fit opacity-80'>
        <h2 className='font-bold text-lg mb-2.5'>RESUMO</h2>
        <p className='text-[13.5px] mb-1'>Tem um cupom?</p>
        <div className='flex gap-2'>
            <div className='grid grid-cols-10 items-center border rounded-md w-[70%]'>
                <div className='flex justify-center col-span-2'>
                <IoTicketOutline className='w-5 h-5 text-gray-400/80'/>
                </div>
                <input 
                className='py-2 px-1 outline-none col-span-8 text-[13.5px]' 
                type="text"
                placeholder='Código do cupom'
                />
            </div>
            <button className='text-[13.5px] text-blue-500 rounded-md w-[30%]'>Adicionar</button>
        </div>
        <div className='flex flex-col bg-gray-100/90 rounded-md px-5 py-6 mt-5 gap-4'>
            <div className='flex justify-between items-center text-sm'>
                <h3 className='font-bold'>Produtos</h3>
                <h3 className='font-bold'>R$ 108,90</h3>
            </div>
            <div className='flex justify-between items-center text-[#28be09]'>
                <h3 className='font-bold'>Total</h3>
                <h3 className='font-bold text-lg'>R$ 108,90</h3>
            </div>
        </div>
    </div>
  )
}
