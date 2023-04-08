import React, { useEffect } from 'react'
import { useCarrinhoContext } from '../contexts/Carrinho'

export default function Cart() {

    const {carrinho, listaCarrinho, removeCarrinho, alteraQuantidade, total} = useCarrinhoContext()

    useEffect(() => {
        listaCarrinho()
    }, []);

  return (
    <section className=''>
        <h2 className='px-6 md:px-10 pb-1 pt-4 text-lg font-medium lg:text-xl md:py-8'>Meu carrinho</h2>
        <div className='flex flex-col md:gap-6 justify-between lg:flex-row px-6 md:px-10'>
            <div className='flex flex-col w-full gap-y-0 md:gap-y-6 border-b-4 border-gray-200 md:border-none'>
                <div className='border-b-4 md:border-none border-gray-200 md:px-6 md:bg-white md:rounded-3xl md:shadow-md shadow-gray-300/60 w-full h-fit'>
                    { carrinho.length > 0 ? carrinho.map( (elemento, index) => (
                        <div key={elemento?._id} className={`flex py-5 h-32 items-center gap-4 ${index<(carrinho.length-1)?'border-b lg:border-gray-300 border-gray-300':''}`}>
                            <div className='flex flex-col items-center bg-gray-100 rounded-lg'>
                                <button 
                                    className='bg-gray-200 h-7 w-9 rounded-lg text-gray-400 font-bold'
                                    onClick={()=>alteraQuantidade(elemento?._id, '+')}
                                    >+</button>
                                <p className=' py-1 w-full text-center '>{elemento?.quantidade}</p>
                                <button 
                                    className='bg-gray-200 h-7 w-9 rounded-lg text-gray-400 font-bold text-lg'
                                    onClick={()=>alteraQuantidade(elemento?._id, '-')}
                                    >-</button>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between items-center w-full gap-2'>
                                <div className='flex gap-3'>
                                    <img src={`http://localhost:4000/images/products/${elemento?.img[0]}`} alt="Imagem do produto" className='rounded-md w-24 h-24'/>
                                    <div className='flex justify-center flex-col'>    
                                        <p className='text-sm'>{elemento?.title}</p>
                                        <p className='font-bold'>{elemento?.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                        <button className='text-xs bg-gray-300 py-1 px-2.5 rounded-md font-medium border border-gray-400 block md:hidden w-fit mt-0.5'>Excluir</button>
                                    </div>
                                </div>
                                <svg onClick={() => removeCarrinho(elemento._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden md:block w-6 h-6 lg:w-5 lg:h-5 text-gray-400 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>
                        </div>
                    ) ): <div className='py-5'>
                        <h1 className='my-2 font-medium'>Seu carrinho de compras está vazio.</h1>
                        <h2 className='mb-2 text-sm'>Não perca tempo e preencha-o com lindos artigos de decoração.</h2>
                        </div>}            
                </div>
                <div className='flex flex-col w-full py-5 md:px-6 rounded-lg gap-y-2 md:bg-white md:rounded-3xl md:shadow-md shadow-gray-300/60'>
                    <h1 className='hidden lg:block font-medium'>Cálculo do frete</h1>
                    <p className='font-medium text-sm'>Calcule seu frete</p>
                    <div className='w-full flex justify-between mb-4 gap-x-2 lg:w-2/3'>
                        <input className='outline-1 px-3 text-sm bg-gray-100 rounded-lg w-full' type="text" placeholder='Seu CEP'/>
                        <button className='bg-gray-800 text-white py-2 px-4 rounded-lg'>Calcular</button>
                    </div>
                </div>
            </div>
            <div className='md:bg-white md:rounded-3xl md:shadow-md shadow-gray-300/60 md:px-6 py-6 w-full h-fit lg:w-5/12'>
                <p className='mb-4 text-sm font-medium'>Tem um cupom?</p>
                <div className='flex justify-between mb-4 gap-x-2'>
                    <input className='outline-1 px-3 text-sm bg-gray-100 rounded-lg w-full' type="text" placeholder='CUPOM'/>
                    <button className='bg-gray-800 text-white py-2 px-4 rounded-lg'>Aplicar</button>
                </div>
                <div className='flex justify-between mb-3'>
                    <p className='text-sm text-gray-500'>Subtotal</p>
                    <p className='text-sm'>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
                <div className='flex justify-between mb-3'>
                    <p className='font-medium'>Total</p>
                    <p className='font-medium'>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
                <button className='w-full py-3 bg-gray-800 text-white rounded-lg'>Finzalizar compra</button>
            </div>
        </div>
    </section>
  )
}