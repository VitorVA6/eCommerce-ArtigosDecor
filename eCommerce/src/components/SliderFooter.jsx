import React from 'react'
import Slider from 'react-slick'
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import {BsShieldFillCheck} from 'react-icons/bs'
import {FaShuttleVan} from 'react-icons/fa'
import {IoMail} from 'react-icons/io5'

export default function SliderFooter() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
      };

  return (
    <Slider {...settings} dots dotsClass="meus-dots">
        <div className='text-center mt-5'>
          <div className='flex justify-center mb-2'>
            
            <BsFillArrowLeftCircleFill className='w-9 h-9 text-gray-700'/>
            
          </div>
          
          <h3 className='font-medium text-sm mb-1.5 text-gray-700'>Satisfação ou Reembolso</h3>
          <p className='text-xs'>Caso haja algum problema, devolvemos seu dinheiro</p>
        </div>
        <div className='text-center mt-5'>
          <div className='flex justify-center mb-2'>
            <BsShieldFillCheck className='w-8 h-8 text-gray-700'/>
          </div>
          
          <h3 className='font-medium text-sm mb-1.5 text-gray-700'>Compra segura</h3>
          <p className='text-xs'>Ambiente segura para pagamentos online</p>
        </div>
        <div className='text-center mt-5'>
          <div className='flex justify-center mb-2'>
            <FaShuttleVan className='w-9 h-9 text-gray-700'/>
          </div>
          
          <h3 className='font-medium text-sm mb-1.5 text-gray-700'>Frete grátis</h3>
          <p className='text-xs'>Envio gratuito para todo o Brasil</p>
        </div> 
        <div className='text-center mt-5'>
          <div className='flex justify-center mb-2'>
            <IoMail className='w-9 h-9 text-gray-700'/>
          </div>
          
          <h3 className='font-medium text-sm mb-1.5 text-gray-700'>Suporte profissional</h3>
          <p className='text-xs'>Uma equipe para te atender a semana inteira</p>
        </div> 
      </Slider>
  )
}
