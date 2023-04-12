import React, { useEffect } from 'react'
import ListaProdutos from '../components/ListaProdutos'
import NavLateral from '../components/NavLateral'
import { useCatalogContext } from '../contexts/Catalog'
import bannerInfo from '../images/banner-info.png'
import SliderFooter from '../components/SliderFooter'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useCategoryContext } from '../contexts/Category'

export default function Home() {

    const {catalog, getCatalog} = useCatalogContext()
    const {getCategories, categories} = useCategoryContext()

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
      getCategories()
    }, [] )

  return (

    <section className='flex flex-col overflow-x-hidden gap-y-8'>
      {
        catalog?.bannerdt?.length !== 0 ?
        <div className='w-full md:w-[90vw] lg:w-[93vw] self-center md:my-10 rounded-lg box-border'>
          <Slider className='md:rounded-lg overflow-hidden relative' {...settings} dots dotsClass="meus-dots__banner">
          {
              catalog?.bannerdt?.map( image =>{
                  return (     
                    
                    <img key={image} className='w-full h-[25vh] md:h-[23vh] lg:h-[50vh]' src={`http://localhost:4000/images/carrosel/${image}`} alt="Imagem do produto" />
                             
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
          categorias={categories}
        />
            
        <ListaProdutos title={'Destaques'} categoria={'destaques'}/>     

        <div 
          className='w-full h-40 sm:h-72 md:96 bg-cover bg-center bg-no-repeat flex flex-col py-8 px-6 lg:px-10 mt-6 mb-8' 
          style={{backgroundImage: `url(${bannerInfo})`}}>
          <h2 className='font-bold md:text-3xl md:mt-5 md:ml-3 lg:-mb-1.5 lg:text-[40px] lg:mt-6'>APROVEITE</h2>
          <h2 className='-mt-1 md:text-3xl md:ml-3 md:mt-0 lg:text-[40px] lg:mt-3'>FRETE GRÁTIS</h2>
        </div>

        <ListaProdutos title={'Promoções'} categoria={'promocoes'}/> 

        <SliderFooter />

      </div>
        
    </section>

  )
}
