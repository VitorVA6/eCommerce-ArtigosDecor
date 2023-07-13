import React from 'react'
import { Link } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho'

export default function Modal() {

  const {setModalCarrinho} = useCarrinhoContext()

  return (<>
    <div 
      className=' w-screen h-screen bg-gray-400/50 fixed left-0 top-0 flex justify-center items-center z-10' 
      onClick={() => setModalCarrinho(false)}
    >
        
    </div>
    <div 
      className='slide-in-bottom h-fit bg-white flex flex-col items-center gap-y-10 z-20 fixed py-8 px-12 rounded-2xl w-[450px] left-[calc(50%-225px)] top-[calc(50%-200px)]'    
    >
        <h2 className='text-3xl text-center font-bold text-black/90'>Produto adicionado ao carrinho</h2>
        <div className='w-full'>
            <button 
              className='text-gray-500/90 border border-gray-400 py-3 rounded-lg w-full mb-3 font-medium'
              onClick={() => setModalCarrinho(false)}
            >Continuar comprando</button>
            <Link 
              to={'/cart'} 
              onClick={() => setModalCarrinho(false)} 
              className='flex justify-center text-white font-medium py-3 rounded-lg bg-gray-800 w-full'
            >Finalizar compra</Link>
        </div>
    </div>
</>
  )
}
