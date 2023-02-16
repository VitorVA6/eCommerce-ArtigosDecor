import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Modal from '../components/Modal'
import { useCarrinhoContext } from '../contexts/Carrinho'

export default function Base() {

  const {modalCarrinho} = useCarrinhoContext()

  return (
    <>
      {modalCarrinho?<Modal />:<></>}
      <Header/>      
      <div className='px-32 py-20'>
        <Outlet />
      </div>
      
      <Footer />
        </>
  )
}
