import React, { useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import {AiFillHome, AiFillStar, AiFillTag} from 'react-icons/ai'
import {MdNewReleases, MdEmail} from 'react-icons/md'
import {BsGridFill, BsTelephoneFill} from 'react-icons/bs'
import { useCatalogContext } from '../contexts/Catalog'
import { Link } from 'react-router-dom'

export default function MenuMobile({setMenu, categories}) {

    const [animate, setAnimate] = useState(true)
    const {catalog} = useCatalogContext()

  return (
    <>
    <div 
      className='w-screen h-screen bg-black/50 absolute left-0 top-0 flex justify-center items-center z-10 overflow-hidden md:hidden' 
      onClick={() => {
        setAnimate(false)
        setTimeout(() => setMenu(false), 200) 
      }}
    >
        
    </div>
    <div 
      className={`${animate ? 'slide-in-left':'slide-out-left'} h-screen w-3/4 bg-white flex flex-col items-start z-20 absolute top-0 left-0 text-gray-600 md:hidden`}    
    >
        <div className='flex flex-col w-full h-40 p-7 justify-center relative bg-gradient-to-r from-color-primary to-color-secundary text-gray-100 rounded-b-2xl shadow-md'>
            <h1 className='font-medium text-lg'>Explorar</h1>
            <h1 className='font-bold text-2xl'>Artigos Decor</h1>
            <p className='text-[11px]'>Shopping Online</p>
            <button 
              className='absolute p-1 top-4 right-4'
              onClick={() => {
                setAnimate(false)
                setTimeout(() => setMenu(false), 200) 
              }}
            >
              <IoMdClose className='w-7 h-7'/>
            </button>
        </div>
        
        <div className='flex flex-col w-full p-7 gap-y-4'>
          <Link 
            to={'/'} 
            className='flex gap-3 items-center'
            onClick={() => {
              setAnimate(false)
              setTimeout(() => setMenu(false), 200) 
            }}
          >
            <AiFillHome className='w-4.5 h-4.5'/>
            <p className='cursor-pointer pt-[1px]'>Home</p>
          </Link>
          <Link 
            to={'/category/destaques'} 
            className='flex gap-3 items-center'
            onClick={() => {
              setAnimate(false)
              setTimeout(() => setMenu(false), 200) 
            }}
          >
            <AiFillStar className='w-4.5 h-4.5'/>
            <p className='cursor-pointer pt-[1px]'>Destaques</p>
          </Link>
          <Link 
            to={'/category/promocoes'} 
            className='flex gap-3 items-center'
            onClick={() => {
              setAnimate(false)
              setTimeout(() => setMenu(false), 200) 
            }}  
          >
            <AiFillTag className='w-4.5 h-4.5'/>
            <p className='cursor-pointer pt-[1px]'>Promoções</p>
          </Link>
          <Link 
            to={'/'} 
            className='flex gap-3 items-center'
            onClick={() => {
              setAnimate(false)
              setTimeout(() => setMenu(false), 200) 
            }}  
          >
            <MdNewReleases className='w-4.5 h-4.5'/>
            <p className='cursor-pointer pt-[1px]'>Novidades</p>
          </Link>
          <div className='flex gap-3 items-center'>
            <BsGridFill className='w-3.5 h-3.5 mr-0.5'/>
            <p className='cursor-pointer pt-[1px]'>Categorias</p>
          </div>
          {
                categories?.map(categoria => (
                    <Link 
                      to={`category/${categoria._id}`} 
                      key={categoria._id} 
                      className='cursor-pointer text-sm ml-5'
                      onClick={() => {
                        setAnimate(false)
                        setTimeout(() => setMenu(false), 200) 
                      }}  
                    >{categoria.name}</Link>
                ))
            }
        </div>
        <div className='h-[2.5px] flex bg-gray-300 w-[calc(100%-56px)] mx-7'></div>
        <div className='flex flex-col w-full p-7'>
          <h2 className='font-medium mb-4'>
              Precisa de ajuda?
          </h2>
          {
            catalog?.email !== '' &&
            <div className='flex gap-3 items-center text-sm mb-2'>
              <MdEmail className='w-4.5 h-4.5'/>
              <p className='cursor-pointer pt-[1px]'>{catalog.email}</p>
            </div>
          }
          {
          catalog?.telefone !== ''  &&
          <div className='flex gap-3 items-center text-[13px]'>
            <BsTelephoneFill className='w-3 h-3'/>
            <p className='cursor-pointer pt-[1px]'>{catalog.telefone}</p>
          </div>
          }   
        </div>
    </div>
</>
  )
}
