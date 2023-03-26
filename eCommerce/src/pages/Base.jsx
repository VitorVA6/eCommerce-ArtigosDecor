import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Modal from '../components/Modal'
import { useCarrinhoContext } from '../contexts/Carrinho'

export default function Base() {

  const {modalCarrinho} = useCarrinhoContext()

  return (
    <section className='flex flex-col'>
      {modalCarrinho?<Modal />:<></>}
      <Header/>   
      <div className='h-screen overflow-auto mt-20'>
        <div className='px-32 pb-16'>
          <Outlet />
        </div>
        
        <Footer />
      </div>   
    </section>
  )
}
