import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCatalogContext } from '../contexts/Catalog'
import {FiMenu} from "react-icons/fi"
import {HiOutlineExternalLink} from 'react-icons/hi'
import noteIcon from '../images/caderno.png'

export default function HeaderAdmin({setMenuMobile, setSelected}) {
    const {catalog} = useCatalogContext()

  return (
    <header className='flex bg-white justify-between items-center px-6 lg:px-10 h-16 md:h-20 fixed w-full z-10 border-b'>
        <nav className='flex justify-between items-center w-full'>
            <Link to={'/admin'}>
                <h1 className='lg:text-2xl font-bold'>{'Sua Logo'}</h1>
            </Link >
            <div className='flex items-center gap-4'>
                <div className='md:flex items-center gap-2 hidden'>
                    <p className='text-sm font-medium'>Sua loja:</p>
                    <div className='py-3 bg-gray-100 px-3 rounded-lg md:w-60 lg:w-72 text-blue-500 text-sm font-medium'>
                        {'http://[::1]:5173/'}
                    </div>
                    <Link to={'/'} className='bg-blue-500 p-[11px] rounded-lg' target='_blank'>
                        <HiOutlineExternalLink className='text-white h-5 w-5' />
                    </Link>
                </div>
                <div className='flex gap-4 lg:gap-2 md:border-l border-gray-300 items-center py-3 pl-4 lg:cursor-pointer'>
                    <div 
                        className='flex items-center gap-2'
                        onClick={() => setSelected('req')}
                    >
                        <img className="cursor-pointer w-5 h-5 lg:w-6 lg:h-6" src={noteIcon}/>
                        <h3 className='hidden md:block'>Pedidos</h3>
                    </div>
                    <FiMenu 
                        className="md:hidden w-7 h-7 cursor-pointer"
                        onClick={() => {
                            setMenuMobile(true)
                        }}
                    />
                </div>
            </div>
        </nav>
    </header>
  )
}
