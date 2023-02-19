import React from 'react'
import CatalogoAdmin from '../components/CatalogoAdmin'
import HeaderAdmin from '../components/HeaderAdmin'
import NavLateralAdmin from '../components/NavLateralAdmin'

export default function Admin() {
  return (
    <div className='flex flex-col'>
        <HeaderAdmin />
        <div className='flex h-screen overflow-y-hidden'>
            <NavLateralAdmin />
            <div className='bg-gray-50 p-10 w-full h-full my-20 overflow-auto'>
                <CatalogoAdmin />
            </div>
        </div>
    </div>
  )
}
