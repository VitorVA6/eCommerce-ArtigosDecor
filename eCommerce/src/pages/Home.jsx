import React, { useEffect } from 'react'
import ListaProdutos from '../components/ListaProdutos'
import NavLateral from '../components/NavLateral'
import { useCatalogContext } from '../contexts/Catalog'
import SliderFooter from '../components/SliderFooter'
import Slider from 'react-slick'
import { useCategoryContext } from '../contexts/Category'
import freeShipping from '../images/free-shipping.svg'
import delivery from '../images/delivery.svg'

export default function Home() {

    const {catalog} = useCatalogContext()
    const {getCategories, categories} = useCategoryContext()

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
    };

    const sliderStyle = {
      borderRadius: '10px',
      overflow: 'hidden'
    };

    useEffect( ()=>{
      getCategories()
    }, [] )

  return (

    <section className='flex flex-col overflow-x-hidden gap-y-8'>
      {
        catalog?.bannerdt?.length !== 0 ?
        <div className='w-full md:px-10 xl:px-[60px] self-center md:my-10 rounded-lg box-border'>
          <Slider className='md:rounded-lg overflow-hidden relative' {...settings} dots dotsClass="meus-dots__banner">
          {
              catalog?.bannerdt?.map( image =>{
                  return (     
                    
                    <img key={image} className='w-full h-[25vh] md:h-[23vh] lg:h-[61vh]' src={`http://localhost:4000/images/carrosel/${image}`} alt="Imagem do produto" />
                             
                  )
              })
              
          }
        </Slider>
        </div>
        :
        <div className='10'></div>
        
        
      }
      
      <div className='flex flex-col'>
        <div className='hidden md:flex flex-col w-fit gap-0.5 mb-6 px-5 md:px-10 xl:px-[60px]'>
            <h2 className='font-medium text-[21px]'>Categorias</h2>
            <div className='w-11/12 h-1.5 bg-blue-500 rounded-full'></div>
        </div>
        <NavLateral 
          setCategoria={valor => setFiltroCategoria(valor)} 
          categorias={categories}
        />
            
        <ListaProdutos title={'Destaques'} categoria={'destaques'}/>     

        <div className='w-full flex justify-around -mx-2 md:mx-0 md:px-5'>
          <img className='w-56 md:w-64 lg:w-72 xl:w-96' src={freeShipping} alt="" />
          <div className='flex flex-col justify-center gap-5 md:gap-10'>
            <div className='flex flex-col'>
              <h1 className='font-black text-[20px] md:text-[28px] lg:text-[48px] xl:text-[60px]'>APROVEITE</h1>
              <h1 className='text-[18px] md:text-[26px] lg:text-[48px] xl:text-[60px] -mt-[6px] md:-mt-[2px] lg:-mt-5'>FRETE GRÁTIS</h1>
            </div>
            <div className='flex flex-col md:flex-row gap-2 md:gap-5 xl:gap-8'>
              <p className='text-[13px] md:text-base xl:text-lg'>ENTREGA RÁPIDA</p>
              <div className='w-8 h-[4px] md:w-[8px] lg:w-[4px] rounded-full md:h-full bg-blue-500'></div>
              <p className='text-[13px] md:text-base xl:text-lg'>PROMOÇÕES IMPERDÍVEIS</p>
            </div>
          </div>
          <img className='hidden md:block md:w-64 lg:w-72 xl:w-96' src={delivery} alt="" />
        </div>

        <ListaProdutos title={'Promoções'} categoria={'promocoes'}/> 

        <SliderFooter />

      </div>
        
    </section>

  )
}
