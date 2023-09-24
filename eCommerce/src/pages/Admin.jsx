import React, { useEffect, useState } from 'react'
import CatalogoAdmin from '../components/CatalogoAdmin'
import HeaderAdmin from '../components/HeaderAdmin'
import NavLateralAdmin from '../components/NavLateralAdmin'
import InfoAdmin from '../components/InfoAdmin'
import PersoAdmin from '../components/PersoAdmin'
import ContaAdmin from '../components/ContaAdmin'
import ShipmentAdmin from '../components/ShipmentAdmin'
import { useUserContext } from '../contexts/User'
import { Navigate, useNavigate } from 'react-router-dom'
import Requests from '../components/Requests'
import OrderById from '../components/OrderById'
import IntegrateFacebookAdmin from '../components/IntegrateFacebookAdmin'

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
        <HeaderAdmin setMenuMobile={setMenuMobile} setSelected={setSelected}/>
        <div className='flex h-screen overflow-y-hidden pt-16 md:pt-20'>
            <NavLateralAdmin setSelected={setSelected} selected={selected} setMenuMobile={setMenuMobile} menuMobile={menuMobile}/>         
            <div className='bg-[#f1f1f1] w-full h-full overflow-auto px-4 py-8 lg:p-10'>
                { selected === 'catalog' && <CatalogoAdmin /> }
                { selected === 'info' && <InfoAdmin /> }
                { selected === 'custom' && <PersoAdmin /> }
                { selected === 'acc' && <ContaAdmin /> }
                { selected === 'ship' && <ShipmentAdmin /> }
                { selected === 'req' && <Requests setSelected={setSelected}/> }
                { selected === 'order-id' && <OrderById setSelected={setSelected}/> }
                { selected === 'facebook' && <IntegrateFacebookAdmin/> }
            </div>
        </div>
    </div>
  )
}