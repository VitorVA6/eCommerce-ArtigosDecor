import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useCatalogContext } from '../contexts/Catalog'

export default function HeaderAdmin() {

    const {catalog} = useCatalogContext()

  return (
    <header className='flex bg-black text-white justify-between items-center px-10 h-20 fixed w-full z-30'>
        <nav className='flex justify-between items-center w-full'>
            <Link to={'/admin'}>
                <h1 className='text-lg font-medium'>{catalog?.nome !== '' ? catalog.nome.toUpperCase() : 'Logo'}</h1>
            </Link >
            <div className='flex gap-2 border-l border-gray-500 items-center py-2 px-4 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <h3>Pedidos</h3>
            </div>
        </nav>
    </header>
  )
}
