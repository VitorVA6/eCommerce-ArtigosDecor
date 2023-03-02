import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

export default function ListaProdutosAdmin({produtos, setModalProduto, setEdit, setIdProduto}) {
  
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
    
    return (

    <>
        <div className='flex flex-col mt-4'>
            <h2 className='mb-3 font-medium'>Produtos</h2>
            <button
                className='bg-blue-500 py-3 w-80 text-white rounded-md font-medium'
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
                    className='flex p-2 justify-between items-center border bg-white rounded-xl hover:opacity-70 cursor-pointer duration-200'
                    onClick={() => {
                      setModalProduto(true)
                      setEdit(true)
                      setIdProduto(produto._id)
                    }}
                >
                    <div className='flex items-center gap-2.5'>
                        <img className='w-14 h-14 rounded-md' src={`http://localhost:4000/images/products/${produto?.img}`} alt="Foto do produto" />
                        <div className='flex flex-col'>
                            <p className='text-base'>{produto.title}</p>
                            <p className='text-sm text-gray-400'>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 mr-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        <Android12Switch defaultChecked />
                    </div>
                </div>
            ) )}
        </div>
    </>
  )
}
