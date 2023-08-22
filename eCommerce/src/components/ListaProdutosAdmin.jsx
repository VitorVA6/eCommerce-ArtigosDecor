import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import {AiFillStar} from 'react-icons/ai'
import {AiOutlineStar} from 'react-icons/ai'
import { useProductContext } from '../contexts/Product';
import {VscTrash} from 'react-icons/vsc'
import { useCatalogContext } from '../contexts/Catalog';

export default function ListaProdutosAdmin({produtos, setModalProduto, setEdit, setIdProduto}) {

    const { deleteProduct, favoriteProduct } = useProductContext()
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
    const [checkedSwitch, setCheckedSwitch] = useState(false);
    const Android12Switch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
          borderRadius: 22 / 2,
          '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
          },
          '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
          },
          '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: 'none',
          width: 16,
          height: 16,
          margin: 2,
        },
      }));

      useEffect( () => {
        setScreenWidth(window.innerWidth);
      }, [] )
    
    return (

    <>
        <div className='flex flex-col mt-4'>
            <h2 className='mb-3 font-medium'>Produtos</h2>
            <button
                className='bg-blue-500 py-2.5 lg:py-3 w-full lg:w-80 text-white rounded-md font-medium text-sm'
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
                          <Android12Switch defaultChecked />
                        }
                    </div>
                </div>
            ) )}
        </div>
    </>
  )
}