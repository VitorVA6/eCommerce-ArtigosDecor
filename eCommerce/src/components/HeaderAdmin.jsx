import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCatalogContext } from '../contexts/Catalog'
import {BiNotepad} from 'react-icons/bi'
import {FiMenu} from "react-icons/fi"

export default function HeaderAdmin({setMenuMobile, setAnimate}) {

    const {catalog} = useCatalogContext()

  return (
    <header className='flex bg-gray-800 text-white justify-between items-center px-6 lg:px-10 h-20 fixed w-full z-20'>
        <nav className='flex justify-between items-center w-full'>
            <Link to={'/admin'}>
                <h1 className='lg:text-lg font-medium'>{'Logo'}</h1>
            </Link >
            <div className='flex gap-4 lg:gap-2 border-l border-gray-500 items-center py-2 pl-4 lg:cursor-pointer'>
                <BiNotepad className="cursor-pointer w-6 h-6" />
                <h3 className='hidden lg:block'>Pedidos</h3>
                <FiMenu 
                    className="lg:hidden w-7 h-7 cursor-pointer"
                    onClick={() => {
                        setMenuMobile(true)
                        setAnimate(true)
                    }}
                />
            </div>
        </nav>
    </header>
  )
}
