import React, { useEffect, useState } from 'react'
import ListaProdutos from '../components/ListaProdutos'
import NavLateral from '../components/NavLateral'
import { useCatalogContext } from '../contexts/Catalog'
import {useProductContext} from '../contexts/Product'
import bannerInfo from '../images/banner-info.png'
import SliderFooter from '../components/SliderFooter'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {

    const {catalog, getCatalog} = useCatalogContext()
    const {getProducts, produtos} = useProductContext()

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const sliderStyle = {
      borderRadius: '10px',
      overflow: 'hidden'
    };

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
        <div className='w-full lg:w-[93vw] self-center lg:my-10 rounded-lg'>
          <Slider className='rounded-lg overflow-x-hidden' {...settings} dots dotsClass="meus-dots">
          {
              catalog?.bannerdt?.map( image =>{
                  return (     
                    <div key={image} className='rounded-md'>
                      <img className='w-full h-[50vh]' src={`http://localhost:4000/images/carrosel/${image}`} alt="Imagem do produto" />
                    </div>             
                  )
              })
              
          }
        </Slider>
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
