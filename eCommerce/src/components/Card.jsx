import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineArrowDown} from 'react-icons/ai'
import { useCatalogContext } from '../contexts/Catalog';

export default function Card({produto, categoryPage, layout}) {

    const navigate = useNavigate()
    const taxa = 1.2161
    const [price, setPrice] = useState(produto?.combinations?.length > 0 ? produto.combinations[0]?.price : produto.preco)
    const [priceoff, setPriceoff] = useState(produto?.combinations?.length > 0 ? produto.combinations[0]?.priceoff : produto.desconto)
    const {baseURL} = useCatalogContext()

    const handleClass = () => {
        if(categoryPage){
            if(layout === 'grid'){
                return 'w-full h-[38vw] md:h-[25vw] lg:h-[17vw] xl:h-[12vw]'
            }else{
                return 'h-[44vw] w-[80vw] md:h-[25vw] md:w-[40vw] lg:h-[18vw] lg:w-[27vw] xl:h-[15vw] xl:w-[23vw] mr-5'
            }
        }else{
            return 'h-52 w-52 xl:w-full'
        }
    }

  return (
    <div className={`flex ${layout === 'grid' ? 'flex-col' : 'flex-row'} bg-white rounded-md shadow-lg shadow-gray-300/60 ${categoryPage ? 'p-3' : 'my-5 p-5'} relative`}>
        <div 
            className={`relative ${handleClass()} p-2 gap-2 rounded-[4px] cursor-pointer`}
            style={{ backgroundImage: `url(${baseURL}/images/products/${produto?.img[0]})`, boxSizing: 'border-box', backgroundSize: 'cover'}}
            onClick={(e) => {
                if(e.currentTarget != e.target ) return;
                navigate(`/produto/${produto?._id}`)
                }}
            >
            {
                priceoff > 0 ?
                <div className='flex absolute -left-1 -top-1 gap-0.5 bg-green-500 w-fit py-0.5 px-1.5 items-center text-white rounded-md'>
                    <AiOutlineArrowDown className='w-3 h-3' />
                    <h4 className='text-white font-medium text-sm'>{`${Math.ceil(((price - priceoff)*100)/price)}%`}</h4>
                </div>
                :<></>
            }
        </div>
        <div className={`flex flex-col justify-center lg:py-3 w-full ${layout === 'grid' ? 'mt-[5px]' : ''}`}>
            <p className='mb-1.5 md:mb-3 font-medium text-black/80'>{produto?.title}</p>
            <div className='flex flex-col items-start'>
                <p className={`inline font-bold mr-2 text-green-500 text-lg`}>{priceoff > 0 ? priceoff.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }</p> 
                {
                    priceoff > 0 &&
                    <p className='inline line-through text-gray-400 text-[13px] -mb-[2px] lg:-mb-[1px] xl:mb-2 xl:-mt-0.5'>{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                }
            </div>
            <p className='text-[13px] text-gray-700'>Em até <strong className='text-black text-sm'>12x</strong> de {priceoff > 0 ? (Math.ceil((priceoff * taxa/12)*100)/100).toFixed(2) : (Math.ceil((price*taxa/12)*100)/100).toFixed(2)}</p>
            {
                layout === 'list' &&
                <Link to={`/produto/${produto?._id}`} className='flex justify-center w-full text-sm md:text-base py-2 text-white rounded-md text-medium bg-green-500 mt-1 md:mt-3'>
                    Ver produto
                </Link>
            }        
        </div>
    </div>  
  )
}
