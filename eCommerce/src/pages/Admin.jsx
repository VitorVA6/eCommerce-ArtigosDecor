import React, { useEffect, useState } from 'react'
import CatalogoAdmin from '../components/CatalogoAdmin'
import HeaderAdmin from '../components/HeaderAdmin'
import NavLateralAdmin from '../components/NavLateralAdmin'
import InfoAdmin from '../components/InfoAdmin'
import PersoAdmin from '../components/PersoAdmin'
import ContaAdmin from '../components/ContaAdmin'
import { useUserContext } from '../contexts/User'
import { Navigate } from 'react-router-dom'

export default function Admin() {
  const {authenticated, checkAuth} = useUserContext()
  const [selected, setSelected] = useState('catalog')

  useEffect( ()=> {

    checkAuth()

  }, [] )

  if(!authenticated){
    return <Navigate to='/login'/>
  }

  return (
    <div className='flex flex-col overflow-hidden'>
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
