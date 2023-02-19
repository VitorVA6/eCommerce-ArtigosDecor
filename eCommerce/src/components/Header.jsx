import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho'
import logo from '../assets/logo.png'

export default function Header() {

    const {quantTotal} = useCarrinhoContext ()

  return (
    <header className='flex bg-black text-white justify-between items-center px-20 h-20 fixed w-full z-30'>
        <nav className='flex justify-between items-center  w-full'>
            <Link to={'/'} className='w-16'>
                <img src={logo} alt="" />
            </Link >
            <div className='flex gap-10'>
                <Link to={'/'}>Página inicial</Link>
                <Link>Promoções</Link>
                <Link>Categorias</Link>
            </div>
            <div className='flex items-center gap-8'>
                <div className='flex rounded-full  bg-white items-center'>
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

                <Link to={'/cart'} className='flex items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <h4 className='flex justify-center items-center bg-white h-8 w-8 rounded-full text-black'>{quantTotal}</h4>
                </Link>
            </div>
        </nav>
    </header>
  )
}
