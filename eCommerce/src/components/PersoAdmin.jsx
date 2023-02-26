import React, { useState } from 'react'
import { FiSmartphone } from "react-icons/fi";
import { AiOutlineDesktop } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

export default function PersoAdmin() {

  const [banners, setBanners] = useState([
    'https://offstore-teste.s3-sa-east-1.amazonaws.com/compressed/388cea6033b0bca52e7cdc784e3a338a.jpg',
    'https://offstore-teste.s3-sa-east-1.amazonaws.com/compressed/388cea6033b0bca52e7cdc784e3a338a.jpg',
    'https://offstore-teste.s3-sa-east-1.amazonaws.com/compressed/388cea6033b0bca52e7cdc784e3a338a.jpg'
  ]);

  const [bannerSelect, setBannerSelect] = useState('cell')

  return (
    <section className='flex items-center flex-col w-full'>
      <div className='flex flex-col w-9/12 bg-white py-5 px-7 rounded-t-xl border-b'>
        <h2 className='mb-3 font-medium text-lg'>Informações</h2>
        <div className='flex flex-col w-full gap-2 mb-2.5'>
          <h3 className='text-sm font-medium'>Nome</h3>
          <input type="text" className='px-2 py-2.5 outline-none bg-gray-50 text-sm rounded-lg' placeholder='Nome do seu negócio' />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <h3 className='text-sm font-medium'>Número do Whatsapp</h3>
          <input type="text" className='px-2 py-2.5 outline-none bg-gray-50 text-sm rounded-lg' placeholder='Através desse número seus clientes entrarão em contato' />
        </div>
      </div>
      <div className='flex flex-col w-9/12 bg-white py-5 px-7'>
        <h3 className='font-medium mb-1.5'>Banners</h3>
        <p className='text-sm text-gray-400 mb-2.5'>Adicione banners para destacar sua marca, promoções e mais.</p>
        <p className='text-sm mb-1'>Imagens dos banners</p>
        <div className='flex gap-4 mb-3'>
          <button 
            className={`${bannerSelect === 'cell' ? 'text-blue-500' : 'text-gray-400'} py-1 font-medium text-sm flex gap-1 items-center`}
            onClick={ () => setBannerSelect('cell') }
          >
            <FiSmartphone className='w-4 h-4'/>
            Celular/Tablet
          </button>
          <button 
            className={`${bannerSelect === 'tv' ? 'text-blue-500' : 'text-gray-400'} py-1 font-medium text-sm flex gap-1 items-center`}
            onClick={ () => setBannerSelect('tv') }>
            <AiOutlineDesktop className='w-5 h-5'/>
            Desktop
          </button>
        </div>
        <div className='flex flex-wrap w-full gap-2'>
          <button className='bg-gray-100 w-40 h-24 rounded-xl flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          {banners.map( banner => <img key={uuidv4()} className='w-40 h-24 rounded-xl' src={`${banner}`} alt="Imagem do banner" /> )}
        </div>
      </div>
    </section>
  )
}
