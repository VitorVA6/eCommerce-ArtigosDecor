import React from 'react'
import Slider from 'react-slick'
import {BsArrowCounterclockwise, BsShieldCheck} from 'react-icons/bs'
import {CiDeliveryTruck} from 'react-icons/ci'
import {GoShieldCheck, GoMail} from 'react-icons/go'

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
    <Slider className='lg:hidden py-8 border-b-2 w-[calc(100%-40px)]' {...settings} dots dotsClass="meus-dots">
        <div className='flex flex-col items-center'>
          <div className='flex justify-center mb-2'>
            <div className='flex justify-center items-center w-12 h-12 border-2 border-gray-300 rounded-full'>
              <BsArrowCounterclockwise className='w-6 h-6 text-gray-500'/>
            </div>
          </div>
          <div className='flex flex-col items-center gap-0.5'>
            <h3 className='font-medium text-base text-black/70'>Satisfação ou Reembolso</h3>
            <p className='text-[13px] text-gray-500 text-center'>Reembolso em até 7 dias após o recebimento</p>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='flex justify-center mb-2'>
            <div className='flex justify-center items-center w-12 h-12 border-2 border-gray-300 rounded-full'>
              <GoShieldCheck className='w-[22px] h-[22px] text-gray-500 mt-0.5'/>
            </div>
          </div>
          <div className='flex flex-col items-center gap-0.5'>
            <h3 className='font-medium text-base text-black/70'>Compra segura</h3>
            <p className='text-[13px] text-gray-500 text-center'>Ambiente seguro para pagamentos online</p>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='flex justify-center mb-2'>
            <div className='flex justify-center items-center w-12 h-12 border-2 border-gray-300 rounded-full'>
              <CiDeliveryTruck className='w-[25px] h-[25px] text-gray-500'/>
            </div>
          </div>
          <div className='flex flex-col items-center gap-0.5'>
            <h3 className='font-medium text-base text-black/70'>Frete grátis</h3>
            <p className='text-[13px] text-gray-500 text-center'>Envio gratuito para todo o Brasil</p>
          </div>
        </div> 
        <div className='flex flex-col items-center'>
          <div className='flex justify-center mb-2'>
            <div className='flex justify-center items-center w-12 h-12 border-2 border-gray-300 rounded-full'>
              <GoMail className='w-5 h-5 text-gray-500'/>
            </div>
          </div>
          <div className='flex flex-col items-center gap-0.5'>
            <h3 className='font-medium text-base text-black/70'>Suporte profissional</h3>
            <p className='text-[13px] text-gray-500 text-center'>Uma equipe para te atender a semana inteira</p>
          </div>
        </div> 
      </Slider>

      <div className='hidden lg:grid lg:grid-cols-4 px-[40px] xl:px-32 lg:gap-5 xl:gap-12 justify-center py-7 border-b-2'>
        <div className='flex flex-col gap-4 items-center'>
          <div className='flex justify-center items-center w-16 h-16 border-2 border-gray-300 rounded-full'>
            <BsArrowCounterclockwise className='w-[31px] h-[31px] text-gray-500/70'/>            
          </div>
          <div className='flex flex-col items-center gap-1'>
            <h3 className='font-semibold text-base text-black/70'>Reembolso Garantido</h3>
            <p className='text-[13px] text-gray-500 text-center'>Reembolso em até 7 dias após o recebimento</p>
          </div>
        </div>

        <div className='flex flex-col gap-4 items-center'>
          <div className='flex justify-center items-center w-16 h-16 border-2 border-gray-300 rounded-full'>
            <BsShieldCheck className='w-7 h-7 text-gray-500/80 xl:ml-[1px]'/>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <h3 className='font-semibold text-base text-black/70'>Compra Segura</h3>
            <p className='text-[13px] text-gray-500 text-center'>Ambiente seguro para pagamentos online</p>
          </div>
        </div>

        <div className='flex flex-col gap-4 items-center'>
          <div className='flex justify-center items-center w-16 h-16 border-2 border-gray-300 rounded-full'>
            <CiDeliveryTruck className='w-9 h-9 text-gray-500/80'/>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <h3 className='font-semibold text-base text-black/70'>Frete Grátis</h3>
            <p className='text-[13px] text-gray-500 text-center'>Envio gratuito pelos correios para todo o Brasil</p>
          </div>
        </div> 

        <div className='flex flex-col gap-4 items-center'>
          <div className='flex justify-center items-center w-16 h-16 border-2 border-gray-300 rounded-full'>
            <GoMail className='w-7 h-7 text-gray-500/80'/>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <h3 className='font-semibold text-base text-black/70'>Suporte Profissional</h3>
            <p className='text-[13px] text-gray-500 text-center'>Uma equipe para te atender a semana inteira</p>
          </div>
        </div> 
      </div>
    </>
  )
}
