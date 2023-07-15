import React, { useEffect } from 'react'
import { usePaymentContext } from '../contexts/Payment'

export default function ProgressbarPayment() {

    const {block1, block2, block3, setChangeBlock} = usePaymentContext()

  return (
    <div className='grid grid-cols-3 px-4 xl:hidden h-fit'>
        <div 
            className='flex flex-col items-center relative'
            onClick={()=>{
                if(block1.disabled===false && block1.selected===false){
                    setChangeBlock('1')
                }
            }}
        >
            <div className= {`flex w-full ${block1.disabled===false?'bg-[#28be09]':'bg-gray-400 opacity-40'} h-[3px]`}>                
            </div>
            <div className='flex flex-col absolute -top-[13px] bg-gray-100 p-1'>
                <div className={`px-[7px] py-[1px] w-fit rounded-full ${block1.disabled===false?'bg-[#28be09]':'bg-gray-400 opacity-40'} flex justify-center items-center font-black`}>
                    <h2 className='text-white text-[12px] mt-[1px]'>1</h2>
                </div>
            </div>
            <h4 className='font-bold text-[11px] text-center mt-3 px-4'>
                Informações pessoais
            </h4>
        </div>
        <div 
            className='flex flex-col items-center relative'
            onClick={()=>{
                if(block2.disabled===false && block2.selected===false){
                    setChangeBlock('2')
                }
            }}
        >
            <div className= {`flex w-full ${block2.disabled===false?'bg-[#28be09]':'bg-gray-400 opacity-40'} h-[3px]`}>                
            </div>
            <div className='flex flex-col absolute -top-[13px] bg-gray-100 p-1'>
                <div className={`px-[7px] py-[1px] w-fit rounded-full ${block2.disabled===false?'bg-[#28be09]':'bg-gray-400 opacity-40'} flex justify-center items-center font-black`}>
                    <h2 className='text-white text-[12px] mt-[1px]'>2</h2>
                </div>              
            </div>
            <h4 className='font-bold text-[11px] text-center mt-3 px-4'>
                Entrega
            </h4>
        </div>
        <div 
            className='flex flex-col items-center relative'
            onClick={()=>{
                if(block3.disabled===false && block3.selected===false){
                    setChangeBlock('3')
                }
            }}
        >
            <div className= {`flex w-full ${block3.disabled===false?'bg-[#28be09]':'bg-gray-400 opacity-40'} h-[3px]`}>                
            </div>
            <div className='flex flex-col absolute -top-[13px] bg-gray-100 p-1'>
                <div className={`px-[7px] py-[1px] w-fit rounded-full ${block3.disabled===false?'bg-[#28be09]':'bg-gray-400 opacity-40'} flex justify-center items-center font-black`}>
                    <h2 className='text-white text-[12px] mt-[1px]'>3</h2>
                </div>
            </div>
            <h4 className='font-bold text-[11px] text-center mt-3 px-4'>
                Pagamento
            </h4>
        </div>
        
    </div>
  )
}
