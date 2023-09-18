import React, { useEffect, useState } from 'react'
import {AiFillStar} from 'react-icons/ai'
import {AiOutlineStar} from 'react-icons/ai'
import { useProductContext } from '../contexts/Product';
import {VscTrash} from 'react-icons/vsc'
import Switch from '@mui/material/Switch'

export default function ListaProdutosAdmin({produtos, setModalProduto, setEdit, setIdProduto}) {

    const { deleteProduct, favoriteProduct } = useProductContext()
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect( () => {
      setScreenWidth(window.innerWidth);
    }, [] )
    
    return (

    <>
        <div className='flex flex-col mt-4'>
            <h2 className='mb-3 font-medium'>Produtos</h2>
            <button
                className='bg-color-primary py-2.5 lg:py-3 w-full lg:w-80 text-white rounded-md font-medium text-sm'
                onClick={() => {
                    setModalProduto(true)
                    setEdit(false)
                }}
            >Adicionar produto</button>
        </div>
        <div className='flex flex-col mt-6 gap-y-2 mb-20'>
            {produtos?.map( produto => (
                <div 
                    key={produto._id} 
                    className='border border-gray-300/80 lg:border-gray-200/70 flex p-2 justify-between items-center bg-white rounded-xl hover:opacity-70 cursor-pointer duration-200'
                    onClick={(e) => {
                      if(e.currentTarget != e.target ) return;
                      setModalProduto(true)
                      setEdit(true)
                      setIdProduto(produto._id)
                    }}
                >
                    <div className='flex items-center gap-2.5'>
                        <img className='w-11 h-11 lg:w-14 lg:h-14 rounded-md' src={`${import.meta.env.VITE_AWS_URL}${produto?.img[0]}`} alt="Foto do produto" />
                        <div className='flex flex-col'>
                            <p className='text-sm lg:text-base'>{produto.title}</p>
                            <p className='text-xs lg:text-sm text-gray-400'>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-1 lg:gap-3 lg:mr-4'>
                        <button onClick={(e) => {
                          favoriteProduct(produto._id, produto.destaque)
                        }}>
                        {
                          produto.destaque?
                          <AiFillStar className="w-5 h-5 lg:w-7 lg:h-7 text-yellow-400"/>
                          :
                          <AiOutlineStar className="w-5 h-5 lg:w-7 lg:h-7 text-gray-400"/>
                        }
                        </button>
                        
                        <VscTrash onClick={ () => {deleteProduct(produto._id)} } className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400"/>
                        
                        {
                          screenWidth < 1024 ?
                          <></>
                          :
                          <Switch />
                        }
                    </div>
                </div>
            ) )}
        </div>
    </>
  )
}