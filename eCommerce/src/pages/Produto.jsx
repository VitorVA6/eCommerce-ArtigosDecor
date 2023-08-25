import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho';
import { useProductContext } from '../contexts/Product';
import Slider from 'react-slick'
import { BsCreditCard2Back, BsShieldCheck, BsArrowCounterclockwise, BsCart2 } from 'react-icons/bs';
import { FiChevronRight } from 'react-icons/fi';
import { useVariationContext } from '../contexts/Variation';

export default function Produto() {
    const {id} = useParams()
    const [produto, setProduto] = useState()
    const [selectedOptions, setSelectedOptions] = useState([])
    const [carregado, setCarregado] = useState(false)
    const [quantidade, setQuantidade] = useState(1)
    const {addCarrinho} = useCarrinhoContext()
    const {getProductById} = useProductContext()
    const {variations, getVariations} = useVariationContext()
    const taxa = 1.2
    const [imgId, setImgId] = useState(0)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    function mudaQuantidade(operador){
        if(operador === '-' && quantidade > 1){
            setQuantidade(quantidade-1)
        }
        else {
            setQuantidade(quantidade+1)
        }
    }

    function verifySelected( idOption ){
        return selectedOptions.find( el => el.option === idOption ) !== undefined
    }

    function handleSelect( idVar, idOption ){
        setSelectedOptions( prev => prev.map( el => {
            if(el.var === idVar){
                return {var: idVar, option: idOption}
            }
            else{
                return el
            }
        }))
    }

    function getPrice(){
        const comb2 = selectedOptions.map( el => el.option ).sort()
        produto?.combinations?.forEach(element => {
            let flag = true
            const comb = element.combination.sort()
            if (comb.length !== comb2.length) {
                flag = false;
            }
            for (let i = 0; i < comb.length; i++) {
                if (comb[i] !== comb2[i]) {
                    flag = false;
                }
            }
            if(flag === true){
                setProduto( prev => ({...prev, preco: element.price, desconto: element.priceoff, combinationId: element.id}) )
                return
            }
        });
    }

    function getVarName(varId){
        const varAux = variations.find( el => el._id === varId )
        if(!!varAux){
            
            return varAux.name
        }
        return ''
    }

    function getOptionName(varId, optionId){
        const varAux = variations?.find( el => el._id === varId )
        if(!!varAux){
            const optionAux = varAux.options.filter( el => el.value === optionId )
            if(!!optionAux && optionAux.length !== 0){
                return optionAux[0].label
            }
            else{
                return ''
            }
        }
        return ''
    }

    useEffect(() => {
        getVariations()
        getProductById(id)
        .then( (data) => {
            setProduto({
                ...data.product, 
                preco: data.product.combinations.length > 0 ? data.product.combinations[0].price : data.product.preco,
                desconto: data.product.combinations.length > 0 ? data.product.combinations[0].priceoff : data.product.desconto,
                combinationId: data.product.combinations.length > 0 ? data.product.combinations[0].id : undefined
            })
            setSelectedOptions(data.product.variations?.length > 0 ? data.product.variations?.map( el => (
                {var: el.idVariacao, option:el.idOptions[0]}) ): [])
            setCarregado(true)
        } )
        .catch(erro => console.log(erro))
    }, [id]);

    if (carregado && !produto){
        return <Navigate to={'/404'}/>
    }

    useEffect( ()=> {
        getPrice()
    }, [selectedOptions] )
  return (
    
    <section className='flex flex-col'>    
        <h3 className='hidden md:flex gap-1 items-center px-5 md:px-10 xl:px-32 my-[28px] text-sm text-blue-500'>
            <p>Página inicial</p> 
            <FiChevronRight className='w-3.5 h-3.5 text-gray-500 mt-0.5'/> 
            <p>{produto?.categoria[0]?.label}</p>
            <FiChevronRight className='w-3.5 h-3.5 text-gray-500 mt-0.5'/>
            <p>{produto?.title}</p>
        </h3>    
        <section className='flex flex-col lg:h-fit justify-center overflow-hidden px-5 md:px-10 xl:px-32 pt-6 md:pt-0 lg:pb-8 lg:gap-7 lg:border-b border-gray-200 lg:flex-row md:gap-y-8 md:pb-2'>
            <div className='w-full lg:w-3/5 lg:bg-white lg:rounded-md lg:p-6 lg:shadow-lg lg:shadow-gray-300/60 md:hidden'>
                <Slider {...settings} dots dotsClass="meus-dots">
                    {
                        produto?.img?.map( image =>{
                            return (
                            <div key={image} className=''>
                                <img 
                                    className='h-96 w-full lg:px-0 rounded-md' 
                                    src={`${import.meta.env.VITE_AWS_URL}${image}`}
                                    alt="Imagem do produto" />
                            </div>)
                        })
                        
                    }
                </Slider>
            </div>
            <div className='w-full lg:w-3/5 h-[80vh] md:bg-white md:rounded-md p-6 shadow-md shadow-gray-300/60 hidden md:flex md:flex-col lg:flex-row'>
                <div className='flex flex-row lg:flex-col gap-2.5 md:order-2 lg:order-1 md:mt-4 lg:mt-0 overflow-auto lg:mr-4 md:mr-0'>
                    {
                        produto?.img?.map( (image, index) =>{
                            return (
                                <img 
                                    key={image} 
                                    className={`${imgId === index ? 'border-[2px] border-blue-500': ''} cursor-pointer h-16 w-16 min-w-[64px] p-0 rounded-md`} 
                                    src={`${import.meta.env.VITE_AWS_URL}${image}`} 
                                    alt="Imagem do produto" 
                                    onMouseOver={() => {
                                        setImgId(index)
                                    }}
                                />
                            )
                        })
                        
                    }
                </div>
                {
                    produto?.img !== undefined &&
                    <div className='flex md:w-full lg:w-[calc(100%-80px)] md:h-[calc(100%-80px)] lg:h-full md:order-1 lg:order-2'>
                        <img className='rounded-lg w-full' src={`${import.meta.env.VITE_AWS_URL}${produto?.img[imgId]}`} alt="Imagem do produto" />
                    </div>
                }
            </div>       
            <div className='flex flex-col w-full lg:w-2/5 h-fit md:px-8 md:py-3 md:bg-white md:rounded-md md:shadow-md lg:shadow-gray-300/60'>
                <div className='flex flex-col pt-3 pb-5 border-b border-gray-300'>
                    <h2 className='text-xl font-medium lg:text-[22px] text-black/90'>{produto?.title}</h2>
                    <h3 className='text-sm text-blue-500'>Disponível em estoque</h3>
                </div>
                
                <div className='flex flex-col mt-6 mb-6'>
                    {
                    produto?.desconto > 0 &&
                    <p className='inline line-through text-gray-500/90 text-[16px] font-light'>{produto?.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    }
                    <div className='flex items-center gap-x-1.5'>
                        {
                        produto?.desconto > 0 ?
                        <p className='text-[36px] text-black/80 leading-none'>{produto?.desconto?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> :
                        <p className='text-[36px] text-black/80 leading-none'>{produto?.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        }
                        {produto?.desconto > 0 &&                           
                        <p className='text-green-500 font-medium'>{ Math.ceil((produto?.preco - produto?.desconto)*100/produto?.preco)}% OFF</p>                          
                        }
                    </div>
                    <div className='flex gap-1 mt-1'>
                        <p className='text-black/80'>em até</p>
                        <p className='text-green-500 font-medium'>12x de {produto?.desconto > 0 ? parseFloat((produto?.desconto* taxa /12).toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : parseFloat((produto?.preco*taxa/12).toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                    {
                    produto?.desconto > 0 &&
                    <p className='bg-blue-100 text-blue-500 px-2 py-[7px] rounded-sm flex w-fit mt-3.5 text-sm font-semibold'>R$ {(produto?.preco - produto?.desconto).toFixed(0)} de desconto</p>
                    }
                </div>
                <div className='flex gap-x-4 items-center'>
                    <img className='w-16 h-10' src="../src/images/logo-correios.png" alt="logo correio" />
                    <div className='flex flex-col'>
                        <p className='text-base text-black/80'>Entrega via correios</p>
                        <p className='text-sm text-blue-500 font-normal'>Após o pagamento confirmado</p>
                    </div>
                </div>                
                {   
                    produto?.combinations?.length > 0 &&  
                    <div className='flex flex-col mt-6 gap-y-4'>  
                    {  
                    produto?.variations?.map( variation => (
                        <div key={variation.idVariacao} className='flex flex-col w-full'>
                            <h3 className='text-base text-gray-700 mb-2'>{getVarName(variation.idVariacao)}:</h3>
                            <div className='flex flex-wrap gap-2'>
                                {variation.idOptions.map( option => (
                                <button 
                                    key={option}
                                    className={`${verifySelected(option) === true ? 'text-blue-500 border-2 border-blue-500': 'border border-gray-300'} py-2 px-3 rounded-lg text-[12px]`}
                                    onClick={() => handleSelect(variation.idVariacao, option)}
                                >
                                    {getOptionName(variation.idVariacao ,option)}                                
                                </button>
                                ) )}
                            </div>
                        </div>
                    ) )  
                    }
                    </div>              
                    }
                    <p className='text-base text-green-500 font-medium mt-4 mb-6 lg:mb-0'>Frete grátis</p>
                <div className='flex gap-5 items-center lg:border-none border-t border-gray-300 pl-1 pt-6'>               
                    <BsCreditCard2Back className="w-6 h-6  text-gray-500" />
                    <div >
                        <p className='font-medium text-sm text-blue-500'>Parcele suas compras</p>
                        <p className='text-gray-400 text-sm'>Parcelamento no cartão de crédito</p>
                    </div>
                </div>
                <div className='flex mt-3 gap-5 items-center pl-1'>              
                    <BsShieldCheck className="w-6 h-6 text-gray-500" />
                    <div>
                        <p className='font-medium text-sm text-blue-500'>Compra segura</p>
                        <p className='text-gray-400 text-sm'>Sua compra é 100% protegida</p>
                    </div>
                </div>
                <div className='flex mt-3 gap-5 items-center border-b border-gray-300 pb-6 lg:border-none pl-1'>              
                    <BsArrowCounterclockwise className="w-6 h-6 text-gray-500" />
                    <div>
                        <p className='font-medium text-sm text-blue-500'>Devolução grátis</p>
                        <p className='text-gray-400 text-sm'>Em até 7 dias a partir do recebimento</p>
                    </div>
                </div>
                <div className='flex gap-2 mt-6 mb-6'>
                    <div className='flex border-2 border-gray-300 rounded-md items-center text-black/80'>
                        <button className='px-4 py-3' onClick={() => mudaQuantidade('-')}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                            </svg>

                        </button>
                        <p className='font-medium'>{quantidade}</p>
                        <button className='px-4' onClick={() => mudaQuantidade('+')}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                            </svg>

                        </button>
                    </div>
                    <button 
                        className='bg-blue-500 text-white py-2 w-full rounded-md font-medium text-base flex items-center justify-center gap-3'
                        onClick={() => addCarrinho(produto, quantidade)}
                    >
                        <BsCart2 className='text-white w-5 h-5'/>
                        Comprar
                    </button>
                </div>
            </div>
        </section>
        <div className='my-5 md:my-6 lg:my-8 md:mx-10 xl:mx-32 md:rounded-md px-6 md-px-8 md:bg-white md:py-8 md:shadow-md md:shadow-gray-300/60'>
            <h3 className='text-lg mb-2 md:text-[20px] font-medium lg:mb-4'>Informações do produto</h3>
            <p className='text-gray-500 text-sm' style={{whiteSpace: "pre-wrap"}}>{produto?.desc}</p>
        </div>       
    </section>
  )
}