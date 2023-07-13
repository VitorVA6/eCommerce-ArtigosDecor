import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho';
import { useProductContext } from '../contexts/Product';
import Slider from 'react-slick'
import { AiOutlineArrowDown } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import { useVariationContext } from '../contexts/Variation';

export default function Produto() {

    const {id} = useParams()
    const [produto, setProduto] = useState({})
    const [selectedOptions, setSelectedOptions] = useState([])
    const [carregado, setCarregado] = useState(false)
    const [quantidade, setQuantidade] = useState(1)
    const {addCarrinho} = useCarrinhoContext()
    const {getProductById} = useProductContext()
    const {variations, getVariations} = useVariationContext()
    const taxa = 1.2
    const [imgId, setImgId] = useState(0)
    const refToTop = useRef();

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

    useEffect( () => {
        setTimeout(() => { refToTop.current.scrollIntoView({ behavior: 'smooth' })}, 500)
    }, [] )

    if (carregado && !produto){
        return <Navigate to={'/404'}/>
    }

    useEffect( ()=> {

        getPrice()

    }, [selectedOptions] )

  return (
    
    <section className='flex flex-col' ref={refToTop}>    
        <h3 className='hidden md:flex gap-1 items-center px-10 my-[28px] text-[13px]'>{`Página inicial`} <FiChevronRight className='w-[12px] h-[12px]'/> {`Armeiro`} <FiChevronRight className='w-[12px] h-[12px]'/> {`Kit 03 bandejas ovais com detalhe sofisticado`} </h3>    
        <section className='flex flex-col lg:h-fit justify-center overflow-hidden md:px-10 pt-6 md:pt-0 lg:py-8 lg:gap-7 lg:border-b border-gray-200 lg:flex-row md:gap-y-8 md:pb-2'>
            
            <div className='w-full lg:w-3/5 lg:bg-white lg:rounded-3xl lg:p-6 lg:shadow-lg lg:shadow-gray-300/60 md:hidden'>
                <Slider {...settings} dots dotsClass="meus-dots">
                    {
                        produto?.img?.map( image =>{
                            return (
                            <div key={image} className='px-6 lg:px-0'>
                                <img className='h-96 w-full lg:px-0 rounded-xl' src={`http://localhost:4000/images/products/${image}`} alt="Imagem do produto" />
                            </div>)
                        })
                        
                    }
                </Slider>
            </div>

            <div className='w-full lg:w-3/5 h-[80vh] md:bg-white md:rounded-3xl p-6 shadow-md shadow-gray-300/60 hidden md:flex md:flex-col lg:flex-row'>
                <div className='flex flex-row lg:flex-col gap-2.5 md:order-2 lg:order-1 md:mt-4 lg:mt-0 overflow-auto lg:mr-4 md:mr-0'>
                    {
                        produto?.img?.map( (image, index) =>{
                            return (
                            
                                <img 
                                    key={image} 
                                    className={`${imgId === index ? 'border-[3px] border-blue-400': ''} cursor-pointer h-16 w-16 min-w-[64px] p-0 rounded-lg`} 
                                    src={`http://localhost:4000/images/products/${image}`} 
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
                        <img className='rounded-lg w-full' src={`http://localhost:4000/images/products/${produto?.img[imgId]}`} alt="Imagem do produto" />
                    </div>
                    
                }
                
            </div>
            
            
            <div className='flex flex-col w-full lg:w-2/5 h-fit px-6 md:px-8 md:py-3 md:bg-white md:rounded-3xl md:shadow-md lg:shadow-gray-300/60'>
                <div className='flex flex-col pt-3 pb-5 border-b border-gray-300'>
                    <h2 className='text-xl font-medium lg:text-[22px]'>{produto?.title}</h2>
                    <h3 className='text-xs text-blue-500'>Disponível em estoque</h3>
                </div>
                
                
                {   
                    produto?.combinations?.length > 0 &&  
                    <div className='flex flex-col mt-6 gap-y-4'>  
                    {  
                    produto?.variations?.map( variation => (
                        <div key={variation.idVariacao} className='flex flex-col w-full'>
                            <h3 className='text-sm text-gray-700 mb-2'>{getVarName(variation.idVariacao)}:</h3>
                            <div className='flex flex-wrap gap-2'>
                                {variation.idOptions.map( option => (
                                <button 
                                    key={option}
                                    className={`${verifySelected(option) === true ? 'text-blue-500 border border-blue-500': 'bg-white border border-gray-300'} py-1 px-3 rounded-lg text-[14px]`}
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
                
                <div className='flex gap-x-12 mt-6 mb-6'>
                    
                    <h3 className='text-sm text-gray-700'>Preço:</h3>
                    <div className=' flex flex-col text-sm lg:text-lg lg:mt-2'>
                    {
                    produto?.desconto > 0 &&
                    <p className='inline line-through text-gray-500'>{produto?.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    }
                    <div className='flex items-center gap-x-1.5'>
                        <p className='font-medium text-2xl text-green-500'>{produto?.desconto?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        {produto?.desconto > 0 &&
                            <div className='flex text-white bg-black px items-center justify-center rounded-full h-fit px-2 gap-0.5 mb-0.5'>
                                <AiOutlineArrowDown className='w-3 h-3' />
                                <p className='text-[12px]'>{ Math.ceil((produto?.preco - produto?.desconto)*100/produto?.preco)}%</p>
                            </div>
                        }
                    </div>
                    <p className='text-base'>Em até <strong className='text-black'>12x</strong> de {produto?.desconto > 0 ? (produto?.desconto* taxa /12).toFixed(2) : (produto?.preco*taxa/12).toFixed(2)}</p>
                    {
                        produto?.desconto > 0 &&
                        <p className='bg-black text-white px-3 pt-0.5 rounded-md flex w-fit mt-1 text-[15px]'>R$ {(produto?.preco - produto?.desconto).toFixed(0)} de desconto</p>
                    }
                    </div>
                </div>
                <div className='flex w-full justify-between items-center mb-6'>
                    <div className='flex gap-x-8 items-center'>
                        <img className='w-12 h-10' src="../src/images/logo-correios.png" alt="logo correio" />
                        <div className='flex flex-col'>
                            <p className='text-sm text-gray-700'>Entrega via correios</p>
                            <p className='text-xs text-green-500/70 font-normal'>Após o pagamento confirmado</p>
                        </div>
                    </div>
                    <p className='text-xs text-green-500/70 font-normal'>Frete grátis</p>
                </div>
                
                <div className='flex mt-1 pt-6 mb-1 gap-5 items-center lg:border-none border-t border-gray-300 pl-1'>               
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 lg:w-7 lg:h-7 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <div>
                        <p className='font-medium text-sm'>Parcele suas compras</p>
                        <p className='text-gray-500 text-xs'>Parcelamento no cartão de crédito</p>
                    </div>
                </div>
                
                <div className='flex mt-3 gap-5 items-center border-b border-gray-300 pb-6 lg:border-none pl-1'>              
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 lg:w-7 lg:h-7 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <div>
                        <p className='font-medium text-sm'>Compra segura</p>
                        <p className='text-gray-500 text-xs'>Sua compra é 100% protegida</p>
                    </div>
                </div>

                <div className='flex gap-2 mt-6 mb-6'>
                    <div className='flex bg-gray-300 rounded-md items-center'>
                        <button className='px-6 py-3 mb-1' onClick={() => mudaQuantidade('-')}>-</button>
                        <p className=''>{quantidade}</p>
                        <button className='px-6 py-3 mb-1' onClick={() => mudaQuantidade('+')}>+</button>
                    </div>
                    <button 
                        className='bg-green-600 text-white py-2 w-full rounded-md font-medium text-lg'
                        onClick={() => addCarrinho(produto, quantidade)}
                    >Comprar agora</button>
                </div>
            </div>
        </section>
        <div className='md:my-6 lg:my-8 md:mx-10 md:rounded-3xl px-6 md-px-8 md:bg-white md:py-8 md:shadow-md md:shadow-gray-300/60'>
            <h3 className='text-lg mb-2 md:text-[20px] font-medium lg:mb-4'>Informações do produto</h3>
            <p className='text-gray-500 text-sm' style={{whiteSpace: "pre-wrap"}}>{produto?.desc}</p>
        </div>       
    </section>
  )
}
