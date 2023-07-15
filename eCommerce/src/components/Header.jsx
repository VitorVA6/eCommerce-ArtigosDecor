import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho'
import { useCatalogContext } from '../contexts/Catalog'
import {FiMenu} from "react-icons/fi"
import MenuMobile from './MenuMobile'
import {BsCart2} from 'react-icons/bs'
import {FiPackage} from 'react-icons/fi'
import {IoReturnDownBackSharp} from 'react-icons/io5'
import {AiOutlineHeart} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import { useCategoryContext } from '../contexts/Category'

export default function Header() {

    const {getCategories, categories} = useCategoryContext()
    const {quantTotal} = useCarrinhoContext ()
    const [menu, setMenu] = useState(false)

    useEffect( () => {
        getCategories()
    }, [] )

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
                    <MenuMobile setMenu={setMenu} categories={categories}/>
                }
                <FiMenu className='w-[26px] h-[26px] md:hidden' onClick={() => setMenu(true)}/>
                <Link to={'/'} className='text-2xl md:text-3xl font-bold text-blue-400'>
                    SUA LOGO
                </Link >
                
                <div className='hidden md:flex rounded-xl w-[45%] bg-white items-center justify-between'>
                    <input 
                        type="text" 
                        placeholder='Busque aqui seu produto'
                        className='py-2.5 px-5 rounded-full w-full flex items-center outline-none text-black text-sm'  
                    />
                    <button className='w-14 h-full justify-center flex'>
                        <BiSearch className='w-[26px] h-[26px] text-blue-500'/>
                    </button>

                </div>

                <Link to={'/cart'} className='flex items-center gap-2 relative h-full'>
                    <div className='flex relative'>
                        <BsCart2 className="w-[26px] h-[26px] md:w-7 md:h-7"/>
                        <span 
                            className='flex justify-center items-center bg-blue-500 pb-[2.5px] pt-[4px] pl-[6px] pr-[5px] rounded-full text-white font-medium absolute -top-1 -right-1 text-xs leading-none'
                        >
                            {quantTotal}
                        </span>
                    </div>
                    <h4 className='font-medium hidden md:block'>Carrinho</h4>
                </Link>
                
            </nav>
            <div className='hidden w-full gap-10 py-5 items-center lg:flex justify-center mt-4'>
                <Link to={'/'} className='flex gap-2 items-center text-sm cursor-pointer text-white'>
                    <FiMenu className='w-5 h-5'/>
                    Início
                </Link>
                {
                    categories?.map(categoria => (
                        <Link 
                            key={categoria._id} 
                            className='cursor-pointer text-sm text-white'
                            to={`/category/${categoria._id}`}
                        >{categoria.name}</Link>
                    ))
                }
                <Link to={'/category/destaques'} className='flex items-center text-sm cursor-pointer text-white'>
                    Destaques
                </Link>
                <Link to={'/category/promocoes'} className='flex items-center text-sm cursor-pointer text-white'>
                    Promoções
                </Link>
            </div>

            <div className='flex md:hidden rounded-xl w-full bg-white items-center justify-between mb-2'>
                <input 
                    type="text" 
                    placeholder='Busque aqui seu produto'
                    className='py-2 px-5 rounded-full w-full flex items-center outline-none text-black text-sm placeholder-gray-700'  
                />
                <button className='w-14 h-full justify-center flex items-center'>
                    <BiSearch className='w-[26px] h-[26px] text-blue-500'/>
                </button>
            </div>

        </div>
        
    </header>
  )
}
