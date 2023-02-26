import React, { useState } from 'react'
import CatalogoAdmin from '../components/CatalogoAdmin'
import HeaderAdmin from '../components/HeaderAdmin'
import NavLateralAdmin from '../components/NavLateralAdmin'
import InfoAdmin from '../components/InfoAdmin'
import PersoAdmin from '../components/PersoAdmin'
import ContaAdmin from '../components/ContaAdmin'

export default function Admin() {

  const [selected, setSelected] = useState('catalog')

  return (
    <div className='flex flex-col'>
        <HeaderAdmin />
        <div className='flex h-screen overflow-y-hidden'>
            <NavLateralAdmin setSelected={setSelected} selected={selected}/>
            <div className='bg-gray-50 p-10 w-full h-full my-20 overflow-auto'>
                { selected === 'catalog' && <CatalogoAdmin /> }
                { selected === 'info' && <InfoAdmin /> }
                { selected === 'custom' && <PersoAdmin /> }
                { selected === 'acc' && <ContaAdmin /> }
                
            </div>
        </div>
    </div>
  )
}
