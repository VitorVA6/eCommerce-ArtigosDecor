import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import ListaProdutos from '../components/ListaProdutos'
import NavLateral from '../components/NavLateral'
import { useCatalogContext } from '../contexts/Catalog'
import {useProductContext} from '../contexts/Product'
import bannerInfo from '../images/banner-info.png'
import SliderFooter from '../components/SliderFooter'

export default function Home() {

    const {catalog, getCatalog} = useCatalogContext()
    const {getProducts, produtos} = useProductContext()

    useEffect( ()=>{
      getCatalog()
    }, [] )

    useEffect( ()=>{
      
      getProducts(5, 1, 'all')
      .then( data => {
        
      })
      .catch(err => console.log(err))
      
    }, [])

  return (
    
    <section className='flex flex-col overflow-x-hidden'>
      {
        catalog?.bannerdt?.length !== 0 ?
        <div className='lg:mt-5 mb-10'>
          <Carousel>
            {catalog.bannerdt.map( s => (
              <img className='min-w-full' key={s} src={`http://localhost:4000/images/carrosel/${s}`}/>
            ) ) }
          </Carousel>
        </div>
        :
        <div className='10'></div>
      }
      
      <div className='flex flex-col'>
        <NavLateral 
          setCategoria={valor => setFiltroCategoria(valor)} 
          categorias={[...catalog.categorias]}
        />
            
        <ListaProdutos produtos={produtos} title={'Destaques'} />     

        <div 
          className='w-full h-40 sm:h-72 md:96 bg-cover bg-center bg-no-repeat flex flex-col py-8 px-6 mt-6 mb-8' 
          style={{backgroundImage: `url(${bannerInfo})`}}>
          <h2 className='font-bold -mb-1.5'>APROVEITE</h2>
          <h2>FRETE GRÁTIS</h2>
        </div>

        <ListaProdutos produtos={produtos} title={'Promoções'} /> 

        <SliderFooter />

      </div>
        
    </section>

  )
}
