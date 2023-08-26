import React, { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ModalCart from '../components/ModalCart'
import { useCarrinhoContext } from '../contexts/Carrinho'
import {useCatalogContext} from '../contexts/Catalog'
import { useCategoryContext } from '../contexts/Category'

export default function Base() {

  const refToTop = useRef();
  const {modalCarrinho} = useCarrinhoContext()
  const {getCatalog} = useCatalogContext()
  const {getCategories} = useCategoryContext()
  let location = useLocation()
  
  useEffect(()=>{
    getCatalog()
    getCategories()
  }, [])

  useEffect( () => {
    setTimeout(() => { refToTop.current.scrollTo(0, 0)}, 50)
  }, [location] )

  return (
    <section className='flex flex-col h-screen overflow-auto' ref={refToTop}>
      {modalCarrinho?<ModalCart />:<></>}       
        <Header/> 
        <div className='pb-16 bg-[#f1f1f1]'>
          <Outlet />
        </div>
        <Footer />
    </section>
  )
}
