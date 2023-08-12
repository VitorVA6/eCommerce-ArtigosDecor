import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho'
import {FiMenu} from "react-icons/fi"
import MenuMobile from './MenuMobile'
import {BsCart2, BsTelephone} from 'react-icons/bs'
import {FiPackage} from 'react-icons/fi'
import {IoReturnDownBackSharp} from 'react-icons/io5'
import {AiOutlineHeart} from 'react-icons/ai'
import { BiChevronDown} from 'react-icons/bi'
import {GoSearch} from 'react-icons/go'
import { useCategoryContext } from '../contexts/Category'
import DropdownCategories from './DropDownCategories'
import DropDownSearchbar from './DropDownSearchbar'

export default function Header() {
    const {getCategories, categories} = useCategoryContext()
    const {quantTotal, total} = useCarrinhoContext ()
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate()
    const [key, setKey] = useState('')
    const [selCategory, setSelCategory] = useState('all')

    useEffect( () => {
        getCategories()
    }, [] )

    function handleSearch(){
        if(key.length > 0){
            navigate(`/search/${selCategory==='all'?'all':selCategory._id}/${key}`)
            setKey('')
        }
    }
    function handleSearchMobile(){
        if(key.length > 0){
            navigate(`/search/all/${key}`)
            setKey('')
        }
    }

  return (
    <header className='flex flex-col bg-white justify-between w-full md:justify-center h-fit'>
        <div className='flex w-full justify-center md:justify-between md:px-10 xl:px-32 py-2 text-xs md:text-[13px] text-black/70 font-medium border-b-[2px]'>
            <div className='flex gap-2 items-center'>
                <FiPackage className='w-4 h-4 md:w-5 md:h-5'/>
                <p>Frete grátis para todo o Brasil</p>
            </div>
            <div className='hidden md:flex gap-2 items-center'>
                <IoReturnDownBackSharp className='w-5 h-5'/>
                <p>Trocas e devoluções em até 7 dias</p>
            </div>
            <div className='hidden md:flex gap-2 items-center'>
                <AiOutlineHeart className='w-5 h-5'/>
                <p>Satisfação garantida</p>
            </div>
        </div>
        <div className='flex flex-col justify-between px-5 md:px-10 xl:px-32 text-black/70 gap-5 md:gap-0 items-center pb-5 pt-4 md:pt-8 md:pb-8'>
            <nav className='flex justify-between items-center w-full'>
                {
                    menu &&
                    <MenuMobile setMenu={setMenu} categories={categories}/>
                }
                <FiMenu className='w-[26px] h-[26px] md:hidden' onClick={() => setMenu(true)}/>
                <Link to={'/'} className='text-2xl md:text-[32px] font-black flex'>
                    <p className='text-blue-500'>Minha</p> <p className=''>Loja</p>
                </Link >
                
                <div className='hidden md:flex rounded-full h-full w-[55%] lg:w-[50%] pl-3 lg:pl-0 bg-white items-center text-black-80  justify-between border-[3px]'>
                    <DropDownSearchbar categories={categories} selCategory={selCategory} setSelCategory={setSelCategory}/>
                    <input 
                        type="text" 
                        placeholder='O que está procurando?'
                        className='py-[0px] xl:py-[8px] pl-3 lg:pl-5 rounded-full w-full flex items-center outline-none text-base placeholder-gray-400'
                        value={key}
                        onChange={(ev) => setKey(ev.target.value)}
                    />
                    <button 
                        className='px-[30px] justify-center h-full rounded-full items-center flex bg-gray-200'
                        onClick={handleSearch }
                    >
                        <GoSearch className='w-[22px] h-[22px] text-black/70'/>
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
            <div className='flex md:hidden rounded-full h-full w-full bg-white items-center text-black-80 justify-between border-[3px]'>
                <input 
                    type="text" 
                    placeholder='Busque um produto'
                    className='py-[6px] pl-5 rounded-full w-full flex items-center outline-none text-sm placeholder-gray-400'
                    value={key}
                    onChange={(ev) => setKey(ev.target.value)}
                />
                <button 
                    className='px-[24px] justify-center h-full rounded-full items-center flex bg-gray-200'
                    onClick={handleSearchMobile}
                >
                    <GoSearch className='w-[20px] h-[20px] text-black/80'/>
                </button>
            </div>
        </div>
        <div className='relative hidden w-full py-4 items-center lg:flex justify-between bg-blue-500 text-gray-100 lg:px-10 xl:px-32'>
            <DropdownCategories />
            <div className='flex items-center lg:ml-[42vh] xl:ml-[38vh] lg:text-[13px] xl:text-sm'>
                <Link to={'/'} className='flex gap-2 items-center cursor-pointer border-r px-6 leading-none'>
                    Início
                </Link>
                <Link to={'/category/destaques'} className='flex items-center cursor-pointer px-6 border-r leading-none'>
                    Destaques
                </Link>
                <Link to={'/category/promocoes'} className='flex items-center cursor-pointer px-6 border-r leading-none'>
                    Promoções
                </Link>
                <Link to={'/category/lancamentos'} className='flex items-center cursor-pointer px-6 border-r leading-none'>
                    Lançamentos
                </Link>
                <Link to={'/contact'} className='flex items-center cursor-pointer px-6 leading-none'>
                    Contato
                </Link>
            </div>
            <Link to={'/about-us'} className='flex gap-2 items-center font-medium text-sm cursor-pointer leading-none'>
                SOBRE A LOJA
            </Link>
        </div>
        <div className='h-[6px] bg-black/80 block lg:hidden' />
    </header>
  )
}