import React, { useEffect } from 'react'
import { useCarrinhoContext } from '../contexts/Carrinho'
import {Link} from 'react-router-dom'
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
import {FiChevronRight} from 'react-icons/fi'

export default function Cart() {

    const {carrinho, listaCarrinho, removeCarrinho, alteraQuantidade, total} = useCarrinhoContext()

    useEffect(() => {
        listaCarrinho()
        console.log(carrinho)
    }, []);

  return (
    <section className='bg-white px-20 pb-20 -mb-16'>
        <h2 className='pt-20 mb-5  font-bold text-[40px] text-black/80'>Meu Carrinho</h2>
        <div className = 'grid grid-cols-7 gap-12'>
            <div className='flex flex-col col-span-5 w-full'>
                <div className='grid grid-cols-6 text-gray-500/80 py-4 font-medium border-b'>
                    <h3 className='col-span-3'>PRODUTO</h3>
                    <h3 className='col-span-1'>PREÇO</h3>
                    <h3 className='col-span-1 pl-[16%]'>QTD</h3>
                    <h3 className='col-span-1'>TOTAL</h3>
                </div>                
                { carrinho.length > 0 ? carrinho.map( (elemento, index) => (
                    <div key={elemento?._id} className={`grid grid-cols-6 py-5 items-center ${index<(carrinho.length-1)&&'border-b border-gray-300'}`}>
                        <div className='flex gap-5 col-span-3'>
                            <img src={`http://localhost:4000/images/products/${elemento?.img[0]}`} alt="Imagem do produto" className='rounded-sm w-24 h-24'/>
                            <div className='flex flex-col justify-center'>    
                                <p className='font-medium text-black/80'>{elemento?.title}</p>
                                <p className='text-xs font-medium text-gray-500/80'>{`#${elemento?._id}`}</p>                                
                            </div>
                        </div>
                        <p className='font-medium text-lg text-black/80'>{elemento?.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <div className='flex items-center text-black/80 font-medium gap-4 text-lg'>
                            <AiOutlineMinus 
                                className='w-4 h-4 text-black/80 cursor-pointer'
                                onClick={()=>alteraQuantidade(elemento?._id, '-')}
                            />
                            <p className=' text-center '>{elemento?.quantidade}</p>
                            <AiOutlinePlus 
                                className='w-4 h-4 text-black/80 cursor-pointer'
                                onClick={()=>alteraQuantidade(elemento?._id, '+')}
                            />
                        </div>
                        <div className='flex justify-between items-center w-full'>
                            <p className='font-medium text-lg text-black/80'>{(elemento?.preco*elemento?.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <IoMdClose className='w-4 h-4 text-black/80 cursor-pointer m-1' onClick={() => removeCarrinho(elemento._id)} />
                        </div>
                    </div>
                ) ): <div className='py-5'>
                    <h1 className='my-2 font-medium'>Seu carrinho de compras está vazio.</h1>
                    <h2 className='mb-2 text-sm'>Não perca tempo e preencha-o com lindos artigos de decoração.</h2>
                    </div>}            
                
                
            </div>
            <div className='flex flex-col gap-5 col-span-2'>
                <div className='w-full h-fit bg-gray-100 py-4 px-5 rounded-md'>
                    <h2 className='text-[22px] font-bold text-black/80 pb-4 border-b'>Resumo</h2>
                    <div className='flex flex-col gap-4 border-b py-5'>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Produtos</p>
                            <p className='text-sm'>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Frete</p>
                            <p className='text-sm'>Grátis</p>
                        </div>
                        <button className='flex items-center gap-1 font-medium text-sm'>
                            Adicionar Cupom 
                            <FiChevronRight />
                        </button>
                        
                    </div>
                    <div className='flex justify-between pt-5'>
                        <p className='font-medium'>Total</p>
                        <p className='font-medium'>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </div>
                <Link to={'/payment'} className='flex justify-center w-full py-3 bg-blue-700 text-white'>CHECKOUT</Link>
            </div>            
        </div>
    </section>
  )
}