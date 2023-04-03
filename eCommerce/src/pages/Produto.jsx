import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho';
import { useProductContext } from '../contexts/Product';
import Slider from 'react-slick'

export default function Produto() {

    const {id} = useParams()
    const [produto, setProduto] = useState({})
    const [carregado, setCarregado] = useState(false)
    const [quantidade, setQuantidade] = useState(1)
    const {addCarrinho} = useCarrinhoContext()
    const {getProductById} = useProductContext()

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

    useEffect(() => {

        getProductById(id)
        .then( (data) => {
            setProduto(data.product)
            setCarregado(true)
            
        } )
        .catch(erro => console.log(erro))

    }, [id]);

    if (carregado && !produto){
        return <Navigate to={'/404'}/>
    }

  return (
    
    <>        
        <section className='flex flex-col justify-center overflow-hidden py-6 lg:py-16 gap-6 lg:gap-10 lg:border-b border-gray-200 lg:flex-row'>
            
            <div className='w-full lg:w-2/5'>
                <Slider {...settings} dots dotsClass="meus-dots">
                    {
                        produto?.img?.map( image =>{
                            return (
                            <div key={image}>
                                <img className='h-96 w-full' src={`http://localhost:4000/images/products/${image}`} alt="Imagem do produto" />
                            </div>)
                        })
                        
                    }
                </Slider>
            </div>
            
            
            <div className='flex flex-col w-full lg:w-2/5'>
                <h2 className='text-xl mt-2 lg:text-3xl'>{produto?.title}</h2>
                
                <div className='text-sm lg:text-lg lg:mt-2'>
                    <p className={`inline mr-2`}>{(produto?.preco*((100 - produto?.desconto)/100)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> 
                    {
                        produto?.desconto > 0 &&
                        <p className='inline line-through text-gray-500'>{produto?.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    }
                </div>
                <div className='flex gap-2 mt-6 mb-6'>
                    <div className='flex bg-gray-200 rounded-md items-center'>
                        <button className='px-6 py-3 mb-1' onClick={() => mudaQuantidade('-')}>-</button>
                        <p className=''>{quantidade}</p>
                        <button className='px-6 py-3 mb-1' onClick={() => mudaQuantidade('+')}>+</button>
                    </div>
                    <button 
                        className='bg-black text-white py-2 w-full rounded-md'
                        onClick={() => addCarrinho(produto, quantidade)}
                    >Comprar</button>
                </div>
                <div className='flex mt-5 mb-4 gap-5 items-center border-t-2 border-gray-200 pt-8 lg:border-none  pl-1'>               
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 lg:w-7 lg:h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <div>
                        <p className='font-medium'>Parcele suas compras</p>
                        <p className='text-gray-500 text-sm'>Parcelamento no cartão de crédito</p>
                    </div>
                </div>
                <div className='flex mt-3 gap-5 items-center border-b-2 border-gray-200 pb-8 lg:border-none pl-1'>              
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 lg:w-7 lg:h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <div>
                        <p className='font-medium'>Compra segura</p>
                        <p className='text-gray-500 text-sm'>Sua compra é 100% protegida</p>
                    </div>
                </div>
            </div>
        </section>
        <div className='lg:py-16'>
            <h3 className='text-lg mb-2 lgtext-3xl font-medium lg:mb-4'>Descrição</h3>
            <p className='text-gray-500 text-sm' style={{whiteSpace: "pre-wrap"}}>{produto?.desc}</p>
        </div>       
    </>
  )
}
