import React, { useEffect, useState } from 'react'
import CatalogoAdmin from '../components/CatalogoAdmin'
import HeaderAdmin from '../components/HeaderAdmin'
import NavLateralAdmin from '../components/NavLateralAdmin'
import InfoAdmin from '../components/InfoAdmin'
import PersoAdmin from '../components/PersoAdmin'
import ContaAdmin from '../components/ContaAdmin'
import { useUserContext } from '../contexts/User'
import { Navigate, useNavigate } from 'react-router-dom'
import verifyScreen from '../utils/verifyScreen'

export default function Admin() {
  const {authenticated, checkAuth} = useUserContext()
  const [selected, setSelected] = useState('catalog')
  const navigate = useNavigate()

  useEffect( ()=> {
    checkAuth()
  }, [] )

  if(!authenticated){
    return <Navigate to='/login'/>
  }

  const [menuMobile, setMenuMobile] = useState(false)

  return (
    <div className='flex flex-col overflow-hidden'>
        <HeaderAdmin setMenuMobile={setMenuMobile}/>
        <div className='flex h-screen overflow-y-hidden pt-16 md:pt-20'>
            
              
              <NavLateralAdmin setSelected={setSelected} selected={selected} setMenuMobile={setMenuMobile} menuMobile={menuMobile}/>
            
            <div className='bg-gray-200/60 lg:bg-gray-50 w-full h-full overflow-auto px-4 py-8 lg:p-10'>
                { selected === 'catalog' && <CatalogoAdmin /> }
                { selected === 'info' && <InfoAdmin /> }
                { selected === 'custom' && <PersoAdmin /> }
                { selected === 'acc' && <ContaAdmin /> }
                
            </div>
        </div>
    </div>
  )
}