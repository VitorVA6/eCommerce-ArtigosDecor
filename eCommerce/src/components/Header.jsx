import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho'
import { useCatalogContext } from '../contexts/Catalog'
import useComponentVisible from './DropDown'
import {FiMenu} from "react-icons/fi"
import MenuMobile from './MenuMobile'
import {BsCart2} from 'react-icons/bs'

export default function Header() {

    const {quantTotal} = useCarrinhoContext ()
    const {catalog} = useCatalogContext()
    const { ref, isComponentVisible, visibleTrue } = useComponentVisible(false)
    const [menu, setMenu] = useState(false)

  return (
    <header className='flex flex-col bg-gray-800 text-white px-5 justify-between lg:justify-center lg:px-20 h-32 lg:h-20 fixed w-full z-30 pb-2.5 pt-6'>
        <nav className='flex justify-between items-center w-full'>
            {
                menu &&
                <MenuMobile setMenu={setMenu} catalog={catalog}/>
            }
            <FiMenu className='w-7 h-7 lg:hidden' onClick={() => setMenu(true)}/>
            <Link to={'/'}>
                <h1 className='text-lg font-medium'>{catalog?.nome !== '' ? catalog.nome.toUpperCase() : 'Logo'}</h1>
            </Link >
            <div className='hidden lg:flex gap-10'>
                <div 
                    className='flex flex-col px-10 text-gray-100 relative'   
                    ref={ref}
                >
                    <p 
                        className='cursor-pointer px-6 flex gap-x-1 items-center'
                        onClick={() => visibleTrue()}  
                    >
                        Produtos 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </p>
                    {
                        (isComponentVisible) &&
                        <>

                            <div 
                                className='flex flex-col absolute bg-black mt-10 py-3 z-20'                            
                            >
                                <div className='w-full h-px bg-gray-400'></div>
                                <div className='flex flex-col justify-start w-48 gap-y-3 pl-6 py-4'>   
                                    <h2 className='font-medium'>Destaques</h2>
                                    <p className='cursor-pointer font-thin'><nobr>Em destaque</nobr></p>
                                    <p className='cursor-pointer font-thin'>Promoções</p>
                                    <p className='cursor-pointer font-thin'>Novidades</p>
                                </div>
                                
                                <div className='flex flex-col justify-start w-48 gap-y-3 pl-6 border-t border-gray-400 pb-4 pt-6'>   
                                    <h2 className='font-medium'>Categorias</h2>
                                    {
                                        catalog?.categorias?.map(categoria => (
                                            <p key={categoria} className='cursor-pointer font-thin'>{categoria}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    }                            
                </div>
                <Link to={'/about'} className='text-white'>Sobre</Link>
            </div>
            <div className='flex items-center gap-8'>
                <div className='hidden lg:flex rounded-full  bg-white items-center'>
                    <input 
                        type="text" 
                        placeholder='O que você procura?'
                        className='py-2 px-4 rounded-full flex items-center outline-none text-black'  
                    />
                    <button className='w-10 h-full justify-center flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>

                </div>

                <Link to={'/cart'} className='flex items-center gap-2 relative'>
                    <BsCart2 className="w-7 h-7"/>
                    
                    <h4 
                        className='flex justify-center items-center bg-white h-4 w-4 rounded-full text-black absolute -top-1 -right-1 text-xs'
                    >
                        {quantTotal}
                    </h4>
                </Link>
            </div>
        </nav>
        <div className='flex lg:hidden rounded-md  bg-white items-center w-full justify-between mb-2'>
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
    </header>
  )
}
