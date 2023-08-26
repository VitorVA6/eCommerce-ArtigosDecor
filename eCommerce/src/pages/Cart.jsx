import React, {  useEffect } from 'react'
import {useCarrinhoContext} from '../contexts/Carrinho'
import {Link} from 'react-router-dom'
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
import {FiChevronRight} from 'react-icons/fi'
import { useVariationContext } from '../contexts/Variation'
import bagImg from '../images/bolsa-de-compras.png'

export default function Cart() {
    const {carrinho, listaCarrinho, removeCarrinho, alteraQuantidade, total} = useCarrinhoContext()
    const {variations, getVariations} = useVariationContext()

    useEffect(() => {
        console.log(carrinho)
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
    <section className=' px-5 md:px-10 xl:px-32 pb-20 -mb-16'>
        <h2 className='pt-10 md:pt-12 lg:pt-12 mb-10 lg:mb-12 font-semibold text-[24px] md:text-[32px] text-black/80'>Meu Carrinho</h2>
        <div className = 'grid lg:grid-cols-12 xl:grid-cols-7 gap-12'>
            <div className={`h-fit flex flex-col lg:col-span-8 xl:col-span-5 w-full ${carrinho.length > 0 && 'bg-white rounded-md shadow-md shadow-gray-400/60'}`}>
                              
                { carrinho.length > 0 ? 
                    <>
                    <div className='flex md:grid grid-cols-5 xl:grid-cols-6 text-gray-500/80 py-4 font-medium border-b px-4 md:px-6'>
                        <h3 className='md:hidden text-black/90'>Produtos</h3>
                        <h3 className='hidden md:block col-span-3'>PRODUTO</h3>
                        <h3 className='col-span-1 hidden xl:block'>PREÇO</h3>
                        <h3 className='col-span-1 pl-[16%] hidden md:block'>QTD</h3>
                        <h3 className='hidden md:block col-span-1'>TOTAL</h3>
                    </div>  
                    {carrinho.map( (elemento, index) => (
                    <div key={elemento?._id} 
                        className={`flex md:grid md:grid-cols-5 xl:grid-cols-6 py-5 px-4 md:px-6 md:items-center ${index<(carrinho.length-1)&&'border-b border-gray-300'}`}>
                        <div className='flex gap-5 col-span-3'>
                            <img src={`${import.meta.env.VITE_AWS_URL}${elemento?.img[0]}`} alt="Imagem do produto" className='rounded-sm w-20 h-20 md:w-[72px] md:h-[72px] lg:w-20 lg:h-20 xl:w-24 xl:h-24'/>
                            <div className='flex flex-col md:justify-center'>    
                                <p className='md:font-medium text-black/80 text-sm md:text-base w-full'>{elemento?.title}</p>
                                <p className='hidden md:block text-xs font-medium text-gray-500/80'>{`#${elemento?._id}`}</p>
                                {
                                    elemento?.combinations?.length > 0 &&
                                    <p className='text-xs font-medium text-gray-500/80'>{`${fillVarAndOptions(elemento)}`}</p>
                                }
                                <p className='font-bold text-black/80 md:hidden'>{(elemento?.desconto>0?elemento?.desconto:elemento?.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <div className='flex items-center md:hidden gap-[60px] text-sm mt-3'>                                    
                                    <div className='flex rounded-md items-center h-7 border border-gray-300 '>
                                        <div className='w-8 justify-center h-full flex items-center'>
                                            <AiOutlineMinus
                                                className='w-4 h-3 cursor-pointer text-blue-500'
                                                onClick={()=>alteraQuantidade(elemento?._id, '-')}
                                            />
                                        </div>
                                        <p className='text-center text-[13px] px-1 font-medium flex items-center h-full text-black/90'>{elemento?.quantidade}</p>
                                        <div className='w-8 justify-center h-full flex items-center'>
                                            <AiOutlinePlus
                                                className='w-4 h-3 cursor-pointer text-blue-500'
                                                onClick={()=>alteraQuantidade(elemento?._id, '+')}
                                            />
                                        </div>
                                    </div> 
                                    <button 
                                        className='text-blue-500 text-xs font-medium'
                                        onClick={() => removeCarrinho(elemento._id)}     
                                    >
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
                            <IoMdClose 
                                className='w-5 h-5 text-black/80 cursor-pointer m-1' 
                                onClick={() => removeCarrinho(elemento._id)} 
                            />
                        </div>
                    </div>
                ) )}</>: 
                <div className='flex flex-col py-16 md:py-28 h-fit items-center justify-center md:bg-gray-50 rounded-md md:shadow-md md:shadow-gray-400/60'>
                    <img src={bagImg} alt='' className='w-20 h-20 mb-4'/>
                    <h1 className='my-2 font-medium text-base md:text-[20px] text-black/80'>Monte um carrinho de compras!</h1>
                    <h2 className='mb-4 text-black/50 text-sm md:text-[18px] text-center'>Não perca tempo e preencha-o com lindos artigos de decoração.</h2>
                    <Link 
                        to={'/'} 
                        className='flex justify-center w-full md:w-[50%] py-3 bg-blue-500 font-medium text-white mt-3 rounded-md'>
                            Continuar comprando
                    </Link>
                </div>}            
                
                
            </div>
            <div className={`w-full h-fit ${carrinho.length > 0 ? 'bg-white':'bg-gray-50 hidden md:block'} pt-5 pb-6 rounded-md lg:col-span-4 xl:col-span-2 shadow-md shadow-gray-400/60`}>
                <h2 className='text-base md:text-[20px] xl:text-[18px] font-semibold text-black/80 pb-4 border-b px-6'>Resumo da compra</h2>
                { carrinho.length > 0 ? 
                <>
                <div className='flex flex-col gap-4 border-b py-5 px-6'>
                    <div className='flex justify-between text-sm md:text-base lg:text-sm'>
                        <p className=''>Produtos</p>
                        <p className=''>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='lg:text-sm'>Frete</p>
                        <p className='lg:text-sm'>Grátis</p>
                    </div>
                    <button className='flex items-center gap-1 font-medium text-sm md:text-base lg:text-sm'>
                        Adicionar Cupom 
                        <FiChevronRight />
                    </button>
                    
                </div>
                <div className='flex justify-between pt-5 pb-6 px-6 text-[16xx] md:text-[18px] font-medium'>
                    <p>Total</p>
                    <p>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
                <Link to={'/payment'} className='flex justify-center w-[calc(100%-48px)] py-3 bg-blue-600 text-white mx-6 rounded-sm'>CHECKOUT</Link>
                </>
                :
                <p className='px-6 text-sm pt-5'>Aqui você encontrará os valores da sua compra assim que adicionar os produtos.</p>
                }
            </div>     
        </div>
    </section>
  )
}