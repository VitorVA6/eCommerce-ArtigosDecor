import React, { useState } from 'react'
import {IoTicketOutline} from 'react-icons/io5'
import { useCarrinhoContext } from '../contexts/Carrinho'
import { Navigate } from 'react-router-dom'
import {BiChevronDown, BiChevronUp} from 'react-icons/bi'
import {AiOutlineMinus} from 'react-icons/ai'
import masks from '../utils/masks'

export default function PaymentResume() {

    const {total, freight} = useCarrinhoContext()
    const [show, setShow] = useState(false)

    if(total === 0){
        return <Navigate to={'/'}/>
    } 

  return (
    <div className='mx-4 md:mx-0 order-1 xl:order-3 flex flex-col bg-white px-4 py-4 xl:px-6 xl:py-7 rounded-lg shadow-lg shadow-gray-400/10 lg:shadow-md/90 h-fit opacity-80'>
        <div className='flex justify-between items-center'>
            <div>
                <h2 className='font-bold text-sm xl:text-lg items-center'>RESUMO</h2>
                <p className='text-xs text-gray-600 xl:hidden'>Informações da sua compra</p>
            </div>
            <div className='flex gap-4 items-center xl:hidden'>
                <h3 className='font-bold text-[#28be09] text-[15px]'>{`R$ ${total}`}</h3>
                <button 
                    className='pb-1'
                    onClick={() => setShow(!show)}
                >
                    {
                        show === true ?
                        <BiChevronUp className='w-6 h-6'/>:
                        <BiChevronDown className='w-6 h-6'/>

                    }
                </button>
            </div>
        </div>
        <div className={`${show===true?'flex':'hidden'} xl:flex flex-col mt-3 xl:mt-2.5`}>
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
                <button className='text-[13.5px] text-color-primary rounded-md w-[30%]'>Adicionar</button>
            </div>
            <div className='flex flex-col bg-gray-100/90 rounded-md px-5 py-6 mt-5 gap-2 font-bold'>
                <div className='flex justify-between items-center text-[13px] xl:text-sm'>
                    <h3>Produtos</h3>
                    <h3>{masks.maskCurrency(total)}</h3>
                </div>
                <div className='flex justify-between'>
                    <p className='lg:text-sm'>Frete</p>
                    <p className='lg:text-sm'>
                        {freight.delivery === 'UNSELECTED' ? 
                        <AiOutlineMinus className='w-5 h-5 text-black'/> : 
                        masks.maskCurrency(freight.price)}
                    </p>
                </div>
                <div className='flex justify-between items-center text-[#28be09]'>
                    <h3 className='text-[13px] xl:text-base'>Total</h3>
                    <h3 className='text-base xl:text-lg'>{masks.maskCurrency(total + freight.price)}</h3>
                </div>
            </div>
        </div>
    </div>
  )
}
