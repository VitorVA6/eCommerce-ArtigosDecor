import React from 'react'
import { Link } from 'react-router-dom'
import insta from '../assets/insta-logo.png'
import whats from '../assets/whats.png'
import {FaFacebookSquare} from 'react-icons/fa'
import {useCatalogContext} from '../contexts/Catalog'
import {AiOutlinePlus} from 'react-icons/ai'
import american from '../images/american.png'
import diners from '../images/diners.png'
import elo from '../images/elo.png'
import hiper from '../images/hiper.png'
import master from '../images/master.png'
import visa from '../images/visa.png'

export default function Footer() {

    const {catalog} = useCatalogContext()
    const classItems = 'text-[13px] text-gray-200'

  return (
    <section className='flex flex-col w-full bg-black text-white h-fit'>
        <div className='h-[7px] bg-gradient-to-r from-sky-500 to-indigo-500'></div>
        <div className='flex flex-col gap-10 py-12 lg:py-12'>

            <div className='grid md:grid-cols-3 gap-y-7 w-full px-8 md:px-20 xl:px-32'>
                <div className='flex flex-col gap-y-2'>
                    <div className='flex justify-between items-center'>
                        <h3 className='font-medium  text-lg'>Sobre</h3>
                        <AiOutlinePlus className='md:hidden'/>
                    </div>
                    
                    <div className='flex flex-col gap-y-2'>
                        <Link to={'/about-us'} className={classItems}>Artigos Decor</Link>
                        <Link to={'/devolution-policy'} className={classItems}>Política de reembolso</Link>
                        <Link to={'/privacy-policy'} className={classItems}>Política de privacidade</Link>
                    </div>
                    
                </div>

                <div className='flex flex-col gap-y-2'>
                    <div className='flex justify-between items-center'>
                        <h3 className='font-medium  text-lg'>Atendimento</h3>
                        <AiOutlinePlus className='md:hidden'/>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        {
                        catalog?.email !== '' &&
                            <h4 className={classItems}>{catalog.email}</h4>
                        }
                        {
                        catalog?.telefone !== ''  &&
                            <h4 className={classItems}>{catalog.telefone}</h4>
                        }
                    </div>
                    
                    
                </div>
            
                <div className='flex flex-col gap-y-2'>
                    <div className='flex justify-between items-center'>
                        <h3 className='font-medium text-lg'>Redes sociais</h3>
                        <AiOutlinePlus className='md:hidden'/>
                    </div>
                    <div className='flex flex-col gap-y-2 text-[13px]'>
                        <Link 
                            to={'https://www.instagram.com/artigos.decoracoes/'} 
                            target={'_blank'} 
                            className='gap-2 flex items-center rounded-full text-gray-200'>
                                <img className='w-4 h-4' src={insta} alt="Logo do instagram" /> Instagram
                        </Link>
                        <Link 
                            to={'https://www.instagram.com/artigos.decoracoes/'} 
                            target={'_blank'} 
                            className='gap-2 flex items-start rounded-full text-gray-200'>
                                <FaFacebookSquare className='w-[16px] h-[16px] text-white'/> Facebook
                        </Link>
                    </div>
                    
                </div>
            </div>
            <div className='flex gap-3 justify-center items-center'>
                <div className='rounded-[3px] px-3 lg:px-3.5 py-[9px] bg-white'>
                    <img className=' w-[18px] h-3 lg:w-6 lg:h-3.5' src={master} alt="" />
                </div>
                <div className='rounded-[3px] px-2 lg:px-[10px] py-[10px] bg-white'>
                    <img className='w-[26px] h-2.5 lg:w-8 lg:h-3' src={visa} alt="" />
                </div>
                <div className='rounded-[3px] px-[5px] lg:px[6px] py-[8px] bg-white'>
                    <img className='w-[32px] h-3.5 lg:w-[40px] lg:h-4' src={hiper} alt="" />
                </div>
                <div className='rounded-[3px] px-[7px] py-[6px] bg-white'>
                    <img className='w-[28px] h-[18px] lg:w-[32px] lg:h-5' src={american} alt="" />
                </div>
                <div className='rounded-[3px] px-[7px] py-[5px] bg-white'>
                    <img className='w-[28px] h-[20px] lg:w-[32px] lg:h-[22px]' src={diners} alt="" />
                </div>
                <div className='rounded-[3px] px-[5px] py-[5px] bg-white'>
                    <img className='w-[32px] h-[20px] lg:w-[38px] lg:h-[22px]' src={elo} alt="" />
                </div>
            </div>
        </div>
        <div className='flex flex-col justify-between px-20 gap-y-8 py-6 border-t border-t-gray-500 text-xs items-center lg:px-32 lg:flex-row'>
            <p>2023 © TODOS OS DIREITOS RESERVADOS</p>
            <p className='font-medium text-xs'>Desenvolvido por: Vitor Vaz Andrade</p>
        </div>
        <Link 
            to={'https://www.instagram.com/artigos.decoracoes/'} 
            target={'_blank'} 
            className='w-12 h-12 md:w-[56px] md:h-[56px] xl:w-16 xl:h-16 bg-blue-500 flex justify-center items-center rounded-full fixed bottom-6 right-6 md:right-8 md:bottom-8 xl:right-10'>
            <img className='w-5 h-5 xl:w-7 xl:h-7' src={whats} alt="Logo do whatsapp" />
        </Link>
    </section>
  )
}