import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCarrinhoContext } from '../contexts/Carrinho';
import {AiOutlineArrowDown} from 'react-icons/ai'

export default function Card({produto, categoryPage, layout}) {

    const navigate = useNavigate()
    const taxa = 1.2
    const [price, setPrice] = useState(produto?.combinations?.length > 0 ? produto.combinations[0]?.price : produto.preco)
    const [priceoff, setPriceoff] = useState(produto?.combinations?.length > 0 ? produto.combinations[0]?.priceoff : produto.desconto)

    const handleClass = () => {
        if(categoryPage){
            if(layout === 'grid'){
                return 'h-[18vh] w-full'
            }else{
                return 'h-full w-48 mr-5'
            }
        }else{
            return 'h-52 w-52'
        }
    }

    function handlePrice( valueProd, valueComb ){
        if(produto?.combinations?.length > 0){
            return valueComb
        }
        return valueProd
    }

  return (
    <div className={`flex ${layout === 'grid' ? 'flex-col' : 'flex-row'} bg-white rounded-2xl shadow-md shadow-gray-300/60 ${categoryPage ? 'p-3' : 'my-5 p-5'} relative`}>
        <div 
            className={`relative ${handleClass()} lg:h-[30vh] xl:h-[27vh] p-2 gap-2 rounded-lg cursor-pointer`}
            style={{ backgroundImage: `url(http://localhost:4000/images/products/${produto?.img[0]})`, boxSizing: 'border-box', backgroundSize: 'cover'}}
            onClick={(e) => {
                if(e.currentTarget != e.target ) return;
                navigate(`/produto/${produto?._id}`)
                }}
            >
        
            {
                priceoff > 0 ?
                <div className='flex absolute -left-1.5 -top-1.5 gap-0.5 bg-black w-fit py-0.5 px-1.5 items-center text-white rounded-lg'>
                    <AiOutlineArrowDown className='w-4 h-4' />
                    <h4 className='text-white font-medium text-sm mb-0.5'>{`${Math.ceil(((price - priceoff)*100)/price)}%`}</h4>
                </div>
                :<></>
            }
            
        </div>
        <div className={`flex flex-col py-1.5 lg:py-3 w-full ${layout === 'grid' ? 'mt-2' : ''}`}>
            <p className='text-xs text-gray-700 mb-4'>{produto?.title}</p>
            <p className={`inline font-medium mr-2 text-green-500`}>{priceoff > 0 ? priceoff.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }</p> 
            {
                priceoff > 0 &&
                <p className='inline line-through text-gray-500 text-xs'>{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            }
            <p className='text-xs text-gray-700 -mt-1.5'>Em até <strong className='text-black text-sm'>12x</strong> de {priceoff > 0 ? (priceoff * taxa/12).toFixed(2) : (price*taxa/12).toFixed(2)}</p>
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
