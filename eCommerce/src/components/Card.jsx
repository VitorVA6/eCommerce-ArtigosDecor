import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCarrinhoContext } from '../contexts/Carrinho';
import {AiOutlineArrowDown} from 'react-icons/ai'

export default function Card({produto, categoryPage, layout}) {

    const {addCarrinho} = useCarrinhoContext()
    const navigate = useNavigate()
    const taxa = 1.2

    const handleClass = () => {
        if(categoryPage){
            if(layout === 'grid'){
                return 'h-40 w-full'
            }else{
                return 'h-full w-48 mr-5'
            }
        }else{
            return 'h-52 w-52'
        }
    }

  return (
    <div className={`flex ${layout === 'grid' ? 'flex-col' : 'flex-row'} bg-white rounded-2xl shadow-md shadow-gray-300/70 ${categoryPage ? 'p-3' : 'my-5 p-5'} relative`}>
        <div 
            className={`relative ${handleClass()} lg:h-72 p-2 gap-2 rounded-lg cursor-pointer`}
            style={{ backgroundImage: `url(http://localhost:4000/images/products/${produto?.img[0]})`, boxSizing: 'border-box', backgroundSize: 'cover'}}
            onClick={(e) => {
                if(e.currentTarget != e.target ) return;
                navigate(`/produto/${produto?._id}`)
                }} 
            >
        
            {
                produto?.desconto > 0 ?
                <div className='flex absolute -left-1.5 -top-1.5 gap-0.5 bg-black w-fit py-0.5 px-1.5 items-center text-white rounded-lg'>
                    <AiOutlineArrowDown className='w-4 h-4' />
                    <h4 className='text-white font-medium text-sm mb-0.5'>{`${produto?.desconto}%`}</h4>
                </div>
                :<></>
                    
                
            }
            <button 
                className='bg-white p-2 absolute bottom-2 right-2 rounded-full' 
                onClick={() => addCarrinho(produto, 1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            </button>
        </div>
        <div className={`flex flex-col px-2 py-1.5 lg:p-3 w-full ${layout === 'grid' ? 'mt-2' : ''}`}>
            <p className='text-xs text-gray-700 mb-4'>{produto?.title}</p>
            <p className={`inline font-medium mr-2 text-green-500`}>{(produto?.preco*((100 - produto?.desconto)/100)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> 
            {
                produto?.desconto > 0 &&
                <p className='inline line-through text-gray-500 text-xs'>{produto?.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            }
            <p className='text-xs text-gray-700 -mt-1.5'>Em até <strong className='text-black text-sm'>12x</strong> de {produto?.desconto > 0 ? ((produto?.preco* taxa * (100 - produto?.desconto)/100)/12).toFixed(2) : (produto?.preco*taxa/12).toFixed(2)}</p>
            {
                layout === 'list' &&
                <Link to={`/produto/${produto?._id}`} className='flex justify-center w-full py-2 text-white rounded-md text-medium bg-green-500 mt-3'>
                    Ver produto
                </Link>
            }        
        </div>
    </div>  
  )
}
