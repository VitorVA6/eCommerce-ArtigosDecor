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
    <>
    <Slider className='lg:hidden' {...settings} dots dotsClass="meus-dots">
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

      <div className='hidden lg:grid lg:grid-cols-3 xl:grid-cols-4  px-[80px] xl:px-[40px] xl:gap-6 justify-center'>
        <div className='flex mt-5 px-[20px] py-[15px] gap-4 items-center'>
          <div className='flex justify-center mb-2'>
            <BsFillArrowLeftCircleFill className='w-[33px] h-[33px] text-gray-700'/>            
          </div>
          <div className='flex flex-col'>
            <h3 className='font-medium text-sm mb-1.5 text-blue-500'>Satisfação ou Reembolso</h3>
            <p className='text-xs'>Caso haja algum problema, devolvemos seu dinheiro</p>
          </div>
          
        </div>
        <div className='flex mt-5 px-[20px] py-[15px] gap-4 items-center'>
          <div className='flex justify-center mb-2'>
            <BsShieldFillCheck className='w-8 h-8 text-gray-700'/>
          </div>
          <div className='flex flex-col'>
            <h3 className='font-medium text-sm mb-1.5 text-blue-500'>Compra segura</h3>
            <p className='text-xs'>Ambiente segura para pagamentos online</p>
          </div>
          
        </div>
        <div className='flex mt-5 px-[20px] py-[15px] gap-4 items-center'>
          <div className='flex justify-center mb-2'>
            <FaShuttleVan className='w-9 h-9 text-gray-700'/>
          </div>
          <div className='flex flex-col'>
            <h3 className='font-medium text-sm mb-1.5 text-blue-500'>Frete grátis</h3>
            <p className='text-xs'>Envio gratuito pelos correios para todo o Brasil</p>
          </div>
          
        </div> 
        <div className='flex mt-5 px-[20px] py-[15px] gap-4 items-center lg:col-start-2 lg:grid-end-2 xl:col-auto'>
          <div className='flex justify-center mb-2'>
            <IoMail className='w-9 h-9 text-gray-700'/>
          </div>
          <div className='flex flex-col'>
            <h3 className='font-medium text-sm mb-1.5 text-blue-500'>Suporte profissional</h3>
            <p className='text-xs'>Uma equipe para te atender a semana inteira</p>
          </div>
          
        </div> 
      </div>
    </>
  )
}
