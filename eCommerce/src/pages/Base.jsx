import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Modal from '../components/Modal'
import { useCarrinhoContext } from '../contexts/Carrinho'

export default function Base() {

  const {modalCarrinho} = useCarrinhoContext()

  return (
    <section className='flex flex-col h-screen overflow-auto'>
      {modalCarrinho?<Modal />:<></>}
        
      
        <Header/> 
        <div className='pb-16 bg-gray-200/40'>
          <Outlet />
        </div>
        
        <Footer />
      
    </section>
  )
}
