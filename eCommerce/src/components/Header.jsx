import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho'
import {FiMenu} from "react-icons/fi"
import MenuMobile from './MenuMobile'
import {BsCart2, BsTelephone} from 'react-icons/bs'
import {FiPackage} from 'react-icons/fi'
import {IoReturnDownBackSharp} from 'react-icons/io5'
import {AiOutlineHeart} from 'react-icons/ai'
import {BiSearch, BiChevronDown} from 'react-icons/bi'
import {GoSearch} from 'react-icons/go'
import { useCategoryContext } from '../contexts/Category'

export default function Header() {
    const {getCategories, categories} = useCategoryContext()
    const {quantTotal, total} = useCarrinhoContext ()
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate()
    const [key, setKey] = useState('')

    useEffect( () => {
        getCategories()
    }, [] )

    function handleSearch(){
        if(key.length > 0){
            navigate(`/search/${key}`)
            setKey('')
        }
    }

  return (
    <header className='flex flex-col bg-white justify-between w-full md:justify-center h-fit'>
        <div className='flex w-full justify-center md:justify-between md:px-10 xl:px-32 py-2 text-xs md:text-sm text-black/80 font-medium border-b-[2px]'>
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
        <div className='flex flex-col justify-between px-5 md:px-10 xl:px-32 text-black/80 gap-4 md:gap-0 items-center pb-6 pt-4 md:py-8'>
            <nav className='flex justify-between items-center w-full'>
                {
                    menu &&
                    <MenuMobile setMenu={setMenu} categories={categories}/>
                }
                <FiMenu className='w-[26px] h-[26px] md:hidden' onClick={() => setMenu(true)}/>
                <Link to={'/'} className='text-2xl md:text-3xl font-black'>
                    MinhaLoja
                </Link >
                
                <div className='hidden md:flex rounded-full h-full w-[55%] lg:w-[50%] bg-white items-center text-black-80  justify-between border-[3px]'>
                    <div className='flex pl-5 lg:pl-8 pr-3 lg:pr-5 gap-2 lg:gap-6 items-center border-r-[2px] cursor-pointer'>
                        Todos 
                        <BiChevronDown className='w-5 h-5'/>
                    </div>
                    <input 
                        type="text" 
                        placeholder='O que está procurando?'
                        className='py-[10px] pl-3 lg:pl-5 rounded-full w-full flex items-center outline-none text-sm placeholder-gray-400'
                        value={key}
                        onChange={(ev) => setKey(ev.target.value)}
                    />
                    <button 
                        className='px-[30px] justify-center h-full rounded-full items-center flex bg-gray-200'
                        onClick={handleSearch}
                    >
                        <GoSearch className='w-[26px] h-[26px] text-black/80'/>
                    </button>
                </div>
                <div className='flex items-center gap-4'>
                    <Link 
                        to={'/'}
                        className='hidden lg:flex relative rounded-full border-[2px] border-gray-200 items-center justify-center h-[40px] w-[40px]'>
                            <BsTelephone className="w-[26px] text-gray-500/80 h-[26px] md:w-[17px] md:h-[17px]"/>
                    </Link>
                    <Link to={'/cart'} className='flex items-center gap-2 relative h-full'>
                        <div className='flex relative rounded-full border-[2px] border-gray-200 h-[34px] w-[34px] md:h-[40px] md:w-[40px] justify-center items-center'>
                            <BsCart2 className="w-[22px] h-[22px] text-gray-500/80 md:w-5 md:h-5"/>
                            <div 
                                className='flex justify-center items-center bg-blue-500 rounded-full text-white font-medium absolute -top-1 -right-1 text-[12px] leading-none w-[18px] h-[18px]'
                            >
                                <span className='text-[11px] text-gray-100 mt-[1px]'>{quantTotal}</span>
                            </div>
                        </div>
                        <h4 className='font-medium hidden text-sm lg:block text-black/80'>
                            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </h4>
                    </Link>
                </div>
                
            </nav>
            <div className='flex md:hidden rounded-full h-full w-full bg-white items-center text-black-80  justify-between border-[3px]'>
                <div className='flex pl-4 pr-2 gap-2 items-center border-r-[2px] cursor-pointer text-sm'>
                    Todos 
                    <BiChevronDown className='w-5 h-5'/>
                </div>
                <input 
                    type="text" 
                    placeholder='O que está procurando?'
                    className='py-[7px] pl-2 rounded-full w-full flex items-center outline-none text-sm placeholder-gray-400'
                    value={key}
                    onChange={(ev) => setKey(ev.target.value)}
                />
                <button 
                    className='px-[20px] justify-center h-full rounded-full items-center flex bg-gray-200'
                    onClick={handleSearch}
                >
                    <GoSearch className='w-[20px] h-[20px] text-black/80'/>
                </button>
            </div>
        </div>
        <div className='hidden w-full py-4 items-center lg:flex justify-center bg-blue-500 text-gray-100'>
            <Link to={'/'} className='flex gap-2 items-center text-sm cursor-pointer border-r px-6 leading-none'>
                <FiMenu className='w-3 h-3'/>
                Home
            </Link>
            
            {
                categories?.map(categoria => (
                    <Link 
                        key={categoria._id} 
                        className='cursor-pointer text-sm px-6 border-r p-0 leading-none'
                        to={`/category/${categoria._id}`}
                    >{categoria.name}</Link>
                ))
            }
            <Link to={'/category/destaques'} className='flex items-center text-sm cursor-pointer px-6 border-r leading-none'>
                Destaques
            </Link>
            <Link to={'/category/promocoes'} className='flex items-center text-sm cursor-pointer px-6 leading-none'>
                Promoções
            </Link>
        </div>
        
    </header>
  )
}