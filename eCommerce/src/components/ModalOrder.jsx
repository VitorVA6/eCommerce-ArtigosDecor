import React, { useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import {BsCheckLg} from 'react-icons/bs'

export default function ModalOrder({setModalOrder, selOrder, setSelOrder}) {

    const [animate, setAnimate] = useState(true)
    const orderList = ['Em destaque', 'Em promoção', 'Ordem alfabética, A-Z', 'Ordem alfabética, Z-A', 'Preço, ordem crescente', 'Preço, ordem decrescente', 'Data, mais antiga primeiro', 'Data, mais recente primeiro']

  return (
    <>
    <div 
      className={`w-screen h-screen bg-black/30 absolute left-0 top-0 flex justify-center items-center z-40 overflow-hidden`}
      onClick={() => {
        setAnimate(false)
        setTimeout(() => setModalOrder(false), 200) 
      }}
    >
        
    </div>
    <div 
        className={`${animate ? 'slide-in-bottom':'slide-out-bottom'} text-[14px] h-fit bg-white flex flex-col z-50 absolute w-full left-0 bottom-0`}
    >
        <div className='flex py-5 pl-5 pr-3.5 w-full justify-between items-center border-b border-gray-300'>
            <h2 className='text-base'>{`Ordenar por`}</h2>
            <IoMdClose 
                className='w-7 h-7'
                onClick={() => {
                    setAnimate(false)
                    setTimeout(() => setModalOrder(false), 200) 
                }}
            />

        </div>
        <div className='flex flex-col py-2 w-full items-start'>

            {
                orderList.map( (item, index) => (
                    <button 
                        key={index} className={`px-5 py-3 flex w-full justify-between ${selOrder === index && 'text-gray-500 font-medium'}`}
                        onClick={
                            () => {
                                setSelOrder(index)
                                setAnimate(false)
                                setTimeout(() => setModalOrder(false), 300) 
                            }
                        }
                    >
                        {item}
                        {
                            selOrder === index &&
                            <BsCheckLg className='text-gray-500'/>
                        }
                    </button>
                ))
            }

        </div>
        
    </div>
</>
  )
}
