import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineArrowDown} from 'react-icons/ai'

export default function Card({produto, page, layout}) {

    const navigate = useNavigate()
    const taxa = 1.2161
    const [price, setPrice] = useState(produto?.combinations?.length > 0 ? produto.combinations[0]?.price : produto.preco)
    const [priceoff, setPriceoff] = useState(produto?.combinations?.length > 0 ? produto.combinations[0]?.priceoff : produto.desconto)

    const handleClass = () => {
        if(page === 'c'){
            if(layout === 'grid'){
                return 'w-full h-[38vw] md:h-[25vw] lg:h-[17vw] xl:h-[15vw] 2xl:h-[12vw]'
            }else{
                return 'h-[32vw] w-[56vw] md:h-[25vw] md:w-[40vw] lg:h-[18vw] lg:w-[27vw] xl:h-[15vw] xl:w-[23vw] mr-5'
            }
        }else if(page === 's'){
            if(layout === 'grid'){
                return 'w-full h-[38vw] md:h-[24vw] lg:h-[18vw] xl:h-[13vw]'
            }else{
                return 'h-[44vw] w-[80vw] md:h-[25vw] md:w-[40vw] lg:h-[18vw] lg:w-[27vw] xl:h-[15vw] xl:w-[23vw] mr-5'
            }
        }else{
            return 'h-52 w-52 xl:w-full'
        }
    }

  return (
    <div 
        className={`flex w-full ${layout === 'grid' ? 'flex-col' : 'flex-row'} bg-white rounded-md cursor-pointer shadow-md shadow-gray-300/80 ${(page==='s'||page==='c') ? 'p-3 md:p-4' : 'my-4 p-4'} relative hover:shadow-lg hover:shadow-gray-400/60`}
        onClick={() =>navigate(`/produto/${produto?._id}`)}
    >
        <div 
            className={`relative ${handleClass()} p-2 gap-2 rounded-sm box-border`}
            style={{ backgroundImage: `url(${import.meta.env.VITE_AWS_URL}${produto?.img[0]})`, backgroundSize: 'cover'}}
            >
            {
                priceoff > 0 && page === 'h' &&
                <div className='py-1 flex absolute -left-1 -top-1 gap-0.5 bg-color-secundary w-fit px-1.5 items-center text-white rounded-md'>
                    <AiOutlineArrowDown className='w-3 h-3' />
                    <h4 className='text-white text-[13px] font-medium leading-none md:text-sm md:mb-0.5 xl:mb-[1.5px]'>{`${Math.ceil(((price - priceoff)*100)/price)}%`}</h4>
                </div>
            }
        </div>
        <div className={`flex flex-col justify-center lg:py-3 w-full ${layout === 'grid' ? `${page === 'h'?'mt-3.5':'mt-2.5'}` : ''}`}>
            <p className='mb-1.5 md:mb-3 font-medium text-black/80 text-sm md:text-[18px] leading-tight'>{produto?.title}</p>
            <div className='flex flex-col'>
                {
                produto?.desconto > 0 &&
                <p className='inline line-through text-gray-600 text-sm md:text-[16px] font-light'>{produto?.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                }
                <div className='flex items-center gap-x-1.5'>
                    {
                    produto?.desconto > 0 ?
                    <p className='text-lg xl:text-[23px] text-black/80 leading-none'>{produto?.desconto?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> :
                    <p className='text-lg xl:text-[23px] text-black/80 leading-none'>{produto?.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    }
                    {produto?.desconto > 0 &&                           
                    <p className='text-color-primary text-sm'>{ Math.ceil((produto?.preco - produto?.desconto)*100/produto?.preco)}% OFF</p>                          
                    }
                </div>
                <div className='flex gap-1 text-sm text-gray-600'>
                    <p>em até 12x de {produto?.desconto > 0 ? parseFloat((produto?.desconto* taxa /12).toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : parseFloat((produto?.preco*taxa/12).toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
                {
                produto?.desconto > 0 && page==='h' &&
                <p className='bg-color-custom-bg text-color-primary px-2 py-[3px] rounded-sm flex w-fit mt-2 text-xs font-semibold'>R$ {(produto?.preco - produto?.desconto).toFixed(0)} de desconto</p>
                }
                <p className='text-green-500 text-[13px] md:text-sm font-medium mt-1.5'>Frete grátis</p>
            </div>
                  
        </div>
    </div>  
  )
}
