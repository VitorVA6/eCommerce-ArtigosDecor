import React, { useEffect } from 'react'
import {useCarrinhoContext} from '../contexts/Carrinho'
import {Link} from 'react-router-dom'
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
import {FiChevronRight} from 'react-icons/fi'
import { useVariationContext } from '../contexts/Variation'

export default function Cart() {

    const {carrinho, listaCarrinho, removeCarrinho, alteraQuantidade, total} = useCarrinhoContext()
    const {variations, getVariations} = useVariationContext()

    useEffect(() => {
        getVariations()
        listaCarrinho()
    }, []);

    function fillVarAndOptions(element){
        let description = ''
        const comb = element.combinations.find(el => el.id === element.combinationId)
        comb.combination.forEach(element => {
            for(let i=0; i<variations.length;i++){
                const option = variations[i].options.find(el => el.value === element)
                if(!!option){
                    description += `${variations[i].name}: ${option.label}${i !== (comb.combination.length-1)?' // ':''}`
                    break
                }
            }
        });
        return description
    }

  return (
    <section className='bg-white px-5 md:px-10 xl:px-[60px] pb-20 -mb-16'>
        <h2 className='pt-10 md:pt-12 lg:pt-16 mb-10 lg:mb-8 font-bold text-[30px] md:text-[36px] text-black/80'>Meu Carrinho</h2>
        <div className = 'grid lg:grid-cols-12 xl:grid-cols-7 gap-12'>
            <div className='flex flex-col lg:col-span-8 xl:col-span-5 w-full border-y border-gray-300 md:border-none'>
                              
                { carrinho.length > 0 ? 
                    <>
                    <div className='hidden md:grid grid-cols-5 xl:grid-cols-6 text-gray-500/80 py-4 font-medium border-b'>
                        <h3 className='col-span-3'>PRODUTO</h3>
                        <h3 className='col-span-1 hidden xl:block'>PREÇO</h3>
                        <h3 className='col-span-1 pl-[16%] hidden md:block'>QTD</h3>
                        <h3 className='col-span-1'>TOTAL</h3>
                    </div>  
                    {carrinho.map( (elemento, index) => (
                    <div key={elemento?._id} 
                        className={`flex md:grid md:grid-cols-5 xl:grid-cols-6 py-5 md:items-center ${index<(carrinho.length-1)&&'border-b border-gray-300'}`}>
                        <div className='flex gap-5 col-span-3'>
                            <img src={`http://localhost:4000/images/products/${elemento?.img[0]}`} alt="Imagem do produto" className='rounded-sm w-20 h-20 md:w-[72px] md:h-[72px] lg:w-20 lg:h-20 xl:w-24 xl:h-24'/>
                            <div className='flex flex-col md:justify-center'>    
                                <p className='md:font-medium text-black/80 text-sm md:text-base w-full'>{elemento?.title}</p>
                                <p className='hidden md:block text-xs font-medium text-gray-500/80'>{`#${elemento?._id}`}</p>
                                {
                                    elemento?.combinations?.length > 0 &&
                                    <p className='text-xs font-medium text-gray-500/80'>{`${fillVarAndOptions(elemento)}`}</p>
                                }
                                <p className='font-bold text-black/80 md:hidden'>{(elemento?.desconto>0?elemento?.desconto:elemento?.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <div className='flex items-center md:hidden gap-[60px] text-sm mt-3'>                                    
                                    <div className='flex rounded-lg items-center h-6'>
                                        <div className='w-8 border border-gray-500/80 justify-center h-full rounded-l-lg bg-gray-300 flex items-center'>
                                            <AiOutlineMinus
                                                className='w-3 h-3 cursor-pointer'
                                                onClick={()=>alteraQuantidade(elemento?._id, '-')}
                                            />
                                        </div>
                                        <p className='text-center px-3 border-y border-gray-500/80 flex items-center h-full'>{elemento?.quantidade}</p>
                                        <div className='w-8 justify-center border border-gray-500/80 rounded-r-lg h-full bg-gray-300 flex items-center'>
                                            <AiOutlinePlus
                                                className='w-4 h-3 cursor-pointer'
                                                onClick={()=>alteraQuantidade(elemento?._id, '+')}
                                            />
                                        </div>
                                    </div> 
                                    <button className='rounded-lg px-3 py-1 text-xs bg-gray-200 border border-gray-400'>
                                        Excluir
                                    </button>     
                                </div>                
                            </div>
                        </div>
                        <p className='font-medium text-lg text-black/80 hidden xl:block'>{(elemento?.desconto>0?elemento?.desconto:elemento?.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <div className='items-center text-black/80 font-medium gap-4 hidden md:flex xl:text-lg'>
                            <AiOutlineMinus
                                className='lg:w-3 lg:h-3.5 xl:w-4 xl:h-4 text-black/80 cursor-pointer'
                                onClick={()=>alteraQuantidade(elemento?._id, '-')}
                            />
                            <p className='text-center'>{elemento?.quantidade}</p>
                            <AiOutlinePlus
                                className='lg:w-3 lg:h-3.5 xl:w-4 xl:h-4 text-black/80 cursor-pointer'
                                onClick={()=>alteraQuantidade(elemento?._id, '+')}
                            />
                        </div>
                        <div className='hidden md:flex justify-between items-center w-full'>
                            <p className='font-medium xl:text-lg text-black/80'>{((elemento?.desconto>0?elemento?.desconto:elemento?.preco)*elemento?.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <IoMdClose className='w-4 h-4 text-black/80 cursor-pointer m-1' onClick={() => removeCarrinho(elemento._id)} />
                        </div>
                    </div>
                ) )}</>: <div className='flex flex-col py-5 h-[240px]'>
                        <h1 className='my-2 font-medium text-2xl text-black/80'>Seu carrinho de compras está vazio.</h1>
                        <h2 className='mb-2 text-black/80'>Não perca tempo e preencha-o com lindos artigos de decoração.</h2>
                        <Link to={'/'} className='flex justify-center w-[40%] py-3 bg-blue-600 text-white mt-3'>CONTINUAR COMPRANDO</Link>
                    </div>}            
                
                
            </div>
            { carrinho.length > 0 &&
            <div className='flex flex-col gap-5 lg:col-span-4 xl:col-span-2'>
                <div className='w-full h-fit bg-gray-100 py-4 px-5 rounded-md'>
                    <h2 className='text-[20px] xl:text-[22px] font-bold text-black/80 pb-4 border-b'>Resumo</h2>
                    <div className='flex flex-col gap-4 border-b py-5'>
                        <div className='flex justify-between'>
                            <p className='lg:text-sm'>Produtos</p>
                            <p className='lg:text-sm'>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='lg:text-sm'>Frete</p>
                            <p className='lg:text-sm'>Grátis</p>
                        </div>
                        <button className='flex items-center gap-1 font-medium lg:text-sm'>
                            Adicionar Cupom 
                            <FiChevronRight />
                        </button>
                        
                    </div>
                    <div className='flex justify-between pt-5'>
                        <p className='font-medium text-[18px] lg:text-base'>Total</p>
                        <p className='font-medium text-[18px] lg:text-base'>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </div>
                <Link to={'/payment'} className='flex justify-center w-full py-3 bg-blue-600 text-white'>CHECKOUT</Link>
            </div> 
            }           
        </div>
    </section>
  )
}