import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho';
import { useProductContext } from '../contexts/Product';

export default function Produto() {

    const {id} = useParams()
    const [produto, setProduto] = useState()
    const [carregado, setCarregado] = useState(false)
    const [quantidade, setQuantidade] = useState(1)
    const {addCarrinho} = useCarrinhoContext()
    const {getProductById} = useProductContext()

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
            setProduto(data?.product)
            setCarregado(true)
        } )
        .catch(erro => console.log(erro))

    }, [id]);

    if (carregado && !produto){
        return <Navigate to={'/404'}/>
    }

  return (
    
    <>        
        <section className='flex justify-center py-16 gap-10 border-b border-gray-200'>
            <div className='w-2/5'>
                <img src={produto ? `http://localhost:4000/images/products/${produto?.img[0]}` : ''} alt="Imagem do produto" />
            </div>
            <div className='flex flex-col w-2/5'>
                <h2 className='text-4xl'>{produto?.title}</h2>
                
                <div className='text-lg mt-2 font-medium'>
                    <p className={`inline mr-2`}>{(produto?.preco*((100 - produto?.desconto)/100)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> 
                    {
                        produto?.desconto > 0 &&
                        <p className='inline line-through text-gray-500'>{produto?.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    }
                </div>
                <div className='flex gap-2 mt-3 mb-5'>
                    <div className='flex bg-gray-200 rounded-md items-center'>
                        <button className='px-6 py-3 mb-1' onClick={() => mudaQuantidade('-')}>-</button>
                        <p className=''>{quantidade}</p>
                        <button className='px-6 py-3 mb-1' onClick={() => mudaQuantidade('+')}>+</button>
                    </div>
                    <button 
                        className='bg-black text-white py-2 px-32 rounded-md'
                        onClick={() => addCarrinho(produto, quantidade)}
                    >Comprar</button>
                </div>
                <div className='flex mt-5 mb-5 gap-5 items-center'>               
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <div>
                        <p className=''>Parcele suas compras</p>
                        <p className='text-gray-500'>Parcelamento no cartão de crédito</p>
                    </div>
                </div>
                <div className='flex mt-5 gap-5 items-center'>              
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <div>
                        <p className=''>Compra segura</p>
                        <p className='text-gray-500'>Sua compra é 100% protegida</p>
                    </div>
                </div>
            </div>
        </section>
        <div className='py-16'>
            <h3 className='text-3xl mb-4'>Descrição</h3>
            <p className='text-gray-500' style={{whiteSpace: "pre-wrap"}}>{produto?.desc}</p>
        </div>       
    </>
  )
}
