import React, { useEffect } from 'react'
import { useCarrinhoContext } from '../contexts/Carrinho'

export default function Cart() {

    const {carrinho, listaCarrinho, removeCarrinho, alteraQuantidade, total} = useCarrinhoContext()

    useEffect(() => {
        listaCarrinho()
    }, []);

  return (
    <section>
        <h2 className='text-3xl mb-6 mt-10 font-medium'>Sacola de compras</h2>
        <div className='flex gap-8 justify-between'>
            <div className='border border-gray-200 py-2 px-8 rounded-lg w-full h-fit'>
                { carrinho.length > 0 ? carrinho.map( (elemento, index) => (
                    <div key={elemento?.id} className={`flex py-5 h-32 items-center gap-4 ${index<(carrinho.length-1)?'border-b border-gray-300':''}`}>
                        <div className='flex flex-col items-center bg-gray-100 rounded-lg'>
                            <button 
                                className='bg-gray-200 h-7 w-9 rounded-lg text-gray-400 font-bold'
                                onClick={()=>alteraQuantidade(elemento?.id, '+')}
                                >+</button>
                            <p className=' py-1 w-full text-center '>{elemento?.quantidade}</p>
                            <button 
                                className='bg-gray-200 h-7 w-9 rounded-lg text-gray-400 font-bold text-lg'
                                onClick={()=>alteraQuantidade(elemento?.id, '-')}
                                >-</button>
                        </div>
                        <div className='flex justify-between items-center w-full'>
                            <div className='flex gap-3'>
                                <img src={`${elemento?.img}`} alt="Imagem do produto" className='rounded-md w-24 h-24'/>
                                <div className='flex justify-center flex-col'>    
                                    <p>{elemento?.title}</p>
                                    <p className='font-medium text-sm'>{elemento?.preco}</p>
                                </div>
                            </div>
                            <svg onClick={() => removeCarrinho(elemento.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
                    </div>
                ) ): <>
                    <h1 className='text-xl my-2 font-medium'>Seu carrinho de compras está vazio.</h1>
                    <h2 className='mb-2'>Não perca tempo e preencha-o com lindos artigos de decoração.</h2>
                    </>}
            </div>
            <div className='border border-gray-200 rounded-lg px-7 py-6 w-5/12 h-fit'>
                <p className='mb-4 text-sm font-medium'>Tem um cupom?</p>
                <div className='flex justify-between mb-4 gap-x-2'>
                    <input className='outline-1 px-3 text-sm bg-gray-100 rounded-lg w-full' type="text" placeholder='CUPOM'/>
                    <button className='bg-black text-white py-2 px-4 rounded-lg'>Aplicar</button>
                </div>
                <div className='flex justify-between mb-3'>
                    <p className='text-sm text-gray-500'>Subtotal</p>
                    <p className='text-sm'>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
                <div className='flex justify-between mb-3'>
                    <p className='font-medium'>Total</p>
                    <p className='font-medium'>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
                <button className='w-full py-3 bg-black text-white rounded-lg'>Finzalizar compra</button>
            </div>
        </div>
    </section>
  )
}
