import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho'
import {FiMenu} from "react-icons/fi"
import MenuMobile from './MenuMobile'
import {BsCart2, BsTelephone} from 'react-icons/bs'
import {FiPackage, FiPhoneCall} from 'react-icons/fi'
import {IoReturnDownBackSharp} from 'react-icons/io5'
import {AiOutlineHeart, AiFillLock} from 'react-icons/ai'
import { BiChevronDown} from 'react-icons/bi'
import {GoSearch} from 'react-icons/go'
import { useCategoryContext } from '../contexts/Category'
import DropdownCategories from './DropDownCategories'
import DropDownSearchbar from './DropDownSearchbar'
import {useCatalogContext} from '../contexts/Catalog'
import logo from '../images/logo.png'

export default function Header() {
    const {getCategories, categories} = useCategoryContext()
    const {catalog} = useCatalogContext()
    const {quantTotal, total} = useCarrinhoContext ()
    const [menu, setMenu] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [key, setKey] = useState('')
    const [selCategory, setSelCategory] = useState('all')
    const [showContact, setShowContact] = useState(false)

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
    function handleKeyDown(event){
        if(event.key === 'Enter'){
            navigate(`/search/${selCategory==='all'?'all':selCategory._id}/${key}`)
            setKey('')
        }
    }
    function handleKeyDownMobile(event){
        if(event.key === 'Enter'){
            navigate(`/search/all/${key}`)
            setKey('')
        }
    }

  return (
    <>
        {
        location.pathname === '/payment' ? 
        <header className='flex flex-col border-b-2 border-gray-300'>
            <div className='flex py-5 px-5 md:px-10 xl:px-32 justify-between items-center'>
                <Link to={'/'}>
                    <img 
                        className='h-[50px] w-[170px] md:h-[40px] md:w-[130px]'
                        src={logo} 
                        alt='imagem da logo'
                    />
                </Link>
                <div className='flex text-gray-400 items-center gap-1'>
                    <AiFillLock className='w-5 h-5'/>
                    <div className='flex flex-col'>
                        <h3 className='font-medium text-xs leading-none'>PAGAMENTO</h3>
                        <h3 className='text-[11px] leading-none'>100% SEGURO</h3>
                    </div>
                </div>
            </div> 
        </header> : 
        <header className='flex flex-col bg-white justify-between w-full md:justify-center h-fit z-10 border md:border-none'>
            <div className='hidden md:flex w-full justify-center md:justify-between md:px-10 xl:px-32 py-1.5 md:py-2 text-xs md:text-[13px] text-black/70 font-medium border-b-[2px]'>
                <div className='flex gap-2 items-center'>
                    <FiPackage className='w-4 h-4 md:w-5 md:h-5'/>
                    <p>Frete grátis para todo o Brasil</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <IoReturnDownBackSharp className='w-5 h-5'/>
                    <p>Trocas e devoluções em até 7 dias</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <AiOutlineHeart className='w-5 h-5'/>
                    <p>Satisfação garantida</p>
                </div>
            </div>
            <div className='flex flex-col justify-between px-3 md:px-10 xl:px-32 text-black/70 gap-4 md:gap-0 items-center pb-4 pt-4 md:pt-8 md:pb-8'>
                <nav className='flex justify-between items-center w-full'>
                    {
                        menu &&
                        <MenuMobile setMenu={setMenu} categories={categories}/>
                    }
                    <FiMenu className='w-[26px] h-[26px] md:hidden' onClick={() => setMenu(true)}/>
                    <Link to={'/'} className='text-2xl md:text-[32px] font-black flex'>
                        <img 
                            className='h-[50px] w-[170px] md:h-[60px] md:w-[200px]'
                            src={logo} 
                            alt='imagem da logo'
                        />
                    </Link >
                    <div className='hidden md:flex rounded-full h-[44px] w-[55%] lg:w-[50%] pl-3 lg:pl-0 bg-white items-center text-black-80  justify-between border-[3px]'>
                        <DropDownSearchbar categories={categories} selCategory={selCategory} setSelCategory={setSelCategory}/>
                        <input 
                            type="text" 
                            placeholder='O que está procurando?'
                            className='pl-3 lg:pl-5 rounded-full w-full flex items-center outline-none text-base placeholder-gray-400'
                            value={key}
                            onChange={(ev) => setKey(ev.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button 
                            className='px-[30px] justify-center h-full rounded-full items-center flex bg-gray-200'
                            onClick={handleSearch }
                        >
                            <GoSearch className='w-[22px] h-[22px] text-black/70'/>
                        </button>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Link 
                            to={'/'}
                            className='hidden lg:flex relative rounded-full items-center justify-center h-[40px] w-[40px]'>
                                <BsTelephone className=" text-color-secundary w-6 h-6"/>
                        </Link>
                        <Link to={'/cart'} className='flex items-center gap-2 relative h-full'>
                            <div className='flex relative rounded-full h-[34px] w-[34px] md:h-[40px] md:w-[40px] justify-center items-center'>
                                <BsCart2 className="w-7 h-7 text-color-secundary md:w-5 md:h-5 xl:w-7 xl:h-7"/>
                                <div 
                                    className='flex justify-center items-center bg-color-secundary rounded-full text-white font-medium absolute -top-0.5 -right-0 md:top-[1px] md:right-0.5 text-[12px] leading-none w-[18px] h-[18px] border border-white'
                                >
                                    <span className='text-[10px] text-gray-100'>{quantTotal}</span>
                                </div>
                            </div>
                            <h4 className='font-medium hidden text-sm lg:block text-black/80'>
                                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h4>
                        </Link>
                    </div>
                    
                </nav>
                <div className='flex md:hidden rounded-md h-full w-full bg-gray-200 items-center text-black/80 justify-between'>
                    <input 
                        type="text" 
                        placeholder='Busque um produto'
                        className='py-2 pl-5 bg-transparent w-full flex items-center outline-none text-sm placeholder-gray-500'
                        value={key}
                        onChange={(ev) => setKey(ev.target.value)}
                        onKeyDown={handleKeyDownMobile}
                    />
                    <button 
                        className='px-3 justify-center h-full rounded-full items-center flex bg-gray-200'
                        onClick={handleSearchMobile}
                    >
                        <GoSearch className='w-[20px] h-[20px] text-color-secundary'/>
                    </button>
                </div>
            </div>
            <div className='relative hidden w-full py-[6px] 2xl:py-[7px] items-center lg:flex justify-between bg-color-primary text-gray-50 lg:px-10 xl:px-32'>
                <DropdownCategories />
                <div className='flex items-center lg:ml-[42vh] xl:ml-[38vh] lg:text-[13px] xl:text-sm font-medium gap-3.5'>
                    <Link to={'/'} className='flex transition-all duration-500 gap-2 items-center cursor-pointer px-3 py-2 leading-none rounded-md 2xl:hover:bg-color-secundary'>
                        Início
                    </Link>
                    <Link to={'/category/destaques'} className='flex transition-all duration-500 items-center cursor-pointer px-3 py-2 leading-none rounded-md hover:bg-color-secundary'>
                        Destaques
                    </Link>
                    <Link to={'/category/promocoes'} className='flex transition-all duration-500 items-center cursor-pointer px-3 py-2 leading-none rounded-md hover:bg-color-secundary'>
                        Promoções
                    </Link>
                    <Link to={'/category/lancamentos'} className='flex transition-all duration-500 items-center cursor-pointer px-3 py-2 2xl leading-none rounded-md hover:bg-color-secundary'>
                        Lançamentos
                    </Link>
                    <div 
                        to={'/contact'} 
                        className='hidden gap-0.5 2xl:flex transition-all duration-500 items-center cursor-pointer pl-3 pr-6 py-2 leading-none rounded-md hover:bg-color-secundary relative'
                        onMouseOver={() => setShowContact(true)}
                        onMouseOut={() => setShowContact(false)}
                    >
                        Contato
                        <BiChevronDown className='w-5 h-5 absolute top-[20%] right-0.5'/>
                        <div className={`cursor-default bg-transparent absolute top-[calc(100%+8px)] left-0 ${showContact===true?'flex':'hidden'} flex-col transition-opacity duration-300 z-40`}>
                            <div className='w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-white ml-4'/>
                            <div className='bg-white px-4 pt-4 pb-6 w-64 flex gap-4 items-center rounded-md shadow-md'>
                                <FiPhoneCall className='w-[36px] h-[36px] text-gray-500 mt-1'/>
                                <div className='flex flex-col text-black/70 w-min'>
                                    <h3 className='text-base font-semibold mb-1'>Chame-nos 24/7</h3>
                                    <h4 className='text-[13px] text-gray-400 mb-0.5'>{catalog.telefone}</h4>
                                    <h4 className='text-[13px] text-gray-400 font-medium'>{catalog.email}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to={'/about-us'} className='flex gap-2 items-center font-medium text-sm cursor-pointer leading-none'>
                    SOBRE A LOJA
                </Link>
            </div>
        </header>
        }
    </>
  )
}