import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho'
import {IoMdClose} from 'react-icons/io'

export default function Modal() {

  const {setModalCarrinho} = useCarrinhoContext()
  const [animate, setAnimate] = useState(true)
  const [opacity, setOpacity] = useState(0)

  function closeModal(){
    setOpacity(0)
    setAnimate(false)
    setTimeout(() => setModalCarrinho(false), 300)
  }

  useEffect(()=> {
    setTimeout(() => setOpacity(100), 50)
  }, [])

  return (<>
    <div 
      className={` w-screen h-screen bg-black/50 fixed left-0 top-0 flex justify-center items-center z-10 transition-opacity ease-in duration-200 opacity-${opacity}`} 
      onClick={() => closeModal()}
    >
    </div>
    <div 
      className={`${animate ? 'slide-in-bottom': 'slide-out-bottom'} h-fit bg-white flex flex-col items-center gap-y-10 z-20 absolute pb-12 md:pb-8 px-6 rounded-md w-full bottom-0 left-0 md:w-[450px] md:left-[calc(50%-225px)] md:top-[calc(50%-200px)]`}    
    >
        <h2 className='text-xl text-center font-bold text-black/80 pt-5'>Adicionado ao carrinho</h2>
        <IoMdClose 
          className='w-7 h-7 text-gray-400 absolute top-[21.5px] right-4 cursor-pointer'
          onClick={() => closeModal()}
        />
        <div className='w-full'>
            <Link 
              to={'/'}
              className='flex justify-center text-color-secundary border border-color-secundary py-3 rounded-md w-full mb-3 font-medium'
              onClick={() => setModalCarrinho(false)}
            >Continuar comprando</Link>
            <Link 
              to={'/cart'} 
              onClick={() => setModalCarrinho(false)} 
              className='flex justify-center text-white font-medium py-3 rounded-md bg-color-secundary w-full'
            >Finalizar compra</Link>
        </div>
    </div>
</>
  )
}
