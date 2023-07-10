import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho'
import { useCatalogContext } from '../contexts/Catalog'
import useComponentVisible from './DropDown'
import {FiMenu} from "react-icons/fi"
import MenuMobile from './MenuMobile'
import {BsCart2} from 'react-icons/bs'
import {FiPackage} from 'react-icons/fi'
import {IoReturnDownBackSharp} from 'react-icons/io5'
import {AiOutlineHeart} from 'react-icons/ai'

export default function Header() {

    const {quantTotal} = useCarrinhoContext ()
    const {catalog} = useCatalogContext()
    const { ref, isComponentVisible, visibleTrue } = useComponentVisible(false)
    const [menu, setMenu] = useState(false)

  return (
    <header className='flex flex-col bg-gray-800 text-white justify-between w-full md:justify-center h-fit'>
        <div className='flex w-full justify-around py-1.5 text-xs md:text-sm bg-blue-500'>
            <div className='flex gap-2 items-center'>
                <FiPackage className='w-5 h-5 md:w-6 md:h-6'/>
                <p>Frete frátis para todo o Brasil</p>
            </div>
            <div className='hidden md:flex gap-2 items-center'>
                <IoReturnDownBackSharp className='w-6 h-6'/>
                <p>Trocas e devoluções em até 7 dias</p>
            </div>
            <div className='hidden md:flex gap-2 items-center'>
                <AiOutlineHeart className='w-6 h-6'/>
                <p>Satisfação garantida</p>
            </div>
        </div>
        <div className='h-full flex flex-col justify-between px-5 pb-2.5 lg:pb-0 pt-6 md:px-12 md:pt-12 gap-7 md:gap-0 md:pb-6'>
            <nav className='flex justify-between items-center w-full'>
                {
                    menu &&
                    <MenuMobile setMenu={setMenu} catalog={catalog}/>
                }
                <FiMenu className='w-7 h-7 md:hidden' onClick={() => setMenu(true)}/>
                <Link to={'/'} className='text-3xl font-bold text-blue-400'>
                    SUA LOGO
                </Link >
                
                <div className='hidden md:flex rounded-md w-1/2 bg-white items-center justify-between'>
                    <input 
                        type="text" 
                        placeholder='Busque aqui seu produto'
                        className='py-2 px-4 rounded-full flex items-center outline-none text-black'  
                    />
                    <button className='w-10 h-full justify-center flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>

                </div>

                <Link to={'/cart'} className='flex items-center gap-2 relative h-full'>
                    <div className='flex relative'>
                        <BsCart2 className="w-7 h-7"/>
                        <span 
                            className='flex justify-center items-center bg-blue-500 pb-[3.5px] pt-[5px] pl-[7px] pr-[6px] rounded-full text-white font-medium absolute -top-1 -right-1 text-xs leading-none'
                        >
                            {quantTotal}
                        </span>
                    </div>
                    
                    
                    <h4 className='font-medium hidden md:block'>Carrinho</h4>
                </Link>
                
            </nav>
            <div className='hidden w-full gap-10 py-5 items-center lg:flex justify-center mt-4'>
                <h4 className='flex gap-2 items-center text-sm cursor-pointer text-white'>
                    <FiMenu className='w-5 h-5'/>
                    Início
                </h4>
                {
                    catalog?.categorias?.map(categoria => (
                        <h4 key={categoria} className='cursor-pointer text-sm text-white'>{categoria}</h4>
                    ))
                }
                <h4 className='flex items-center text-sm cursor-pointer text-white'>
                    Destaques
                </h4>
                <h4 className='flex items-center text-sm cursor-pointer text-white'>
                    Novidades
                </h4>
                <h4 className='flex items-center text-sm cursor-pointer text-white'>
                    Entrar em contato
                </h4>
                <h4 className='flex items-center text-sm cursor-pointer text-white'>
                    Sobre nós
                </h4>
            </div>
            <div className='flex md:hidden rounded-md  bg-white items-center w-full mb-2 justify-between'>
                <input 
                    type="text" 
                    placeholder='O que você procura?'
                    className='pt-1 pb-1.5 px-4 rounded-full flex items-center outline-none text-black text-sm'  
                />
                <button className='justify-center flex mr-2.5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                        viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black cursor-pointer mb-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>

            </div>
        </div>
        
    </header>
  )
}
