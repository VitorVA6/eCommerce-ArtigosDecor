import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import whats from '../assets/whats.png'
import {FaFacebookSquare} from 'react-icons/fa'
import {useCatalogContext} from '../contexts/Catalog'
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import {BsYoutube} from 'react-icons/bs'
import {FaInstagramSquare} from 'react-icons/fa'
import american from '../images/american.png'
import diners from '../images/diners.png'
import elo from '../images/elo.png'
import hiper from '../images/hiper.png'
import master from '../images/master.png'
import visa from '../images/visa.png'
import SliderFooter from './SliderFooter'
import { useCategoryContext } from '../contexts/Category'

export default function Footer() {

    const {catalog} = useCatalogContext()
    const {categories} = useCategoryContext()
    const classItems = 'text-sm text-gray-500/80 py-1'
    const [show, setShow] = useState(false)
    const [showIcon, setShowIcon] = useState(false)
    const [show2, setShow2] = useState(false)
    const [showIcon2, setShowIcon2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [showIcon3, setShowIcon3] = useState(false)    
    const [show4, setShow4] = useState(false)
    const [showIcon4, setShowIcon4] = useState(false)    

  return (
    <section className='flex flex-col w-full bg-white text-black/70 h-fit border-t'>
        <SliderFooter />
        <div className='flex flex-col pt-8 pb-2 md:py-10 lg:py-12 md:gap-y-10'>

            <div className='grid md:grid-cols-4 w-full px-5 md:px-10 xl:px-32 md:justify-between md:gap-5 lg:gap-12'>
                <div className='flex flex-col bg-white'>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-medium md:text-base'>Sobre</h3>
                        <AiOutlineMinus 
                            className={`md:hidden ${showIcon===true?'block':'hidden'} transition-transform duration-500 ${show===false&&'rotate-180'}`}
                            onClick={() => {
                                setShow(false)
                                setTimeout(() => setShowIcon(false), 350)
                            }}
                        />
                        <AiOutlinePlus
                            className={`md:hidden ${showIcon===false?'block':'hidden'} transition-transform duration-500 ${show===true&&'-rotate-180'}`}
                            onClick={() => {
                                setShow(true)
                                setTimeout(() => setShowIcon(true), 350)
                            }}
                        />
                    </div>
                    
                    <div className={`flex flex-col transition-all duration-500 ${show === false ? 'max-h-0':'max-h-[76px]'} md:max-h-fit`}>
                        <Link to={'/about-us'} className={classItems}>Artigos Decor</Link>
                        <Link to={'/devolution-policy'} className={classItems}>Política de reembolso</Link>
                        <Link to={'/privacy-policy'} className={classItems}>Política de privacidade</Link>
                    </div>
                    
                </div>

                <div className='flex flex-col bg-white'>
                    <div className='flex justify-between items-center pb-2 pt-4 md:pt-2'>
                        <h3 className='font-medium md:text-base'>Atendimento</h3>
                        <AiOutlineMinus 
                            className={`md:hidden ${showIcon2===true?'block':'hidden'} transition-transform duration-500 ${show2===false&&'rotate-180'}`}
                            onClick={() => {
                                setShow2(false)
                                setTimeout(() => setShowIcon2(false), 350)
                            }}
                        />
                        <AiOutlinePlus
                            className={`md:hidden ${showIcon2===false?'block':'hidden'} transition-transform duration-500 ${show2===true&&'-rotate-180'}`}
                            onClick={() => {
                                setShow2(true)
                                setTimeout(() => setShowIcon2(true), 350)
                            }}
                        />
                    </div>
                    <div className={`flex flex-col transition-all duration-500 ${show2 === false ? 'max-h-0':'max-h-16'}`}>
                        {
                        catalog?.email !== '' &&
                            <h4 className={`${classItems} pl-[1px]`}>{catalog.email}</h4>
                        }
                        {
                        catalog?.telefone !== ''  &&
                            <h4 className={classItems}>{catalog.telefone}</h4>
                        }
                    </div>
                </div>
                <div className='flex flex-col bg-white'>
                    <div className='flex justify-between items-center pb-2 pt-4 md:pt-2'>
                        <h3 className='font-medium md:text-base hidden lg:block'>Busque Por Categorias </h3>
                        <h3 className='font-medium md:text-base block lg:hidden'>Categorias </h3>
                        <AiOutlineMinus 
                            className={`md:hidden ${showIcon4===true?'block':'hidden'} transition-transform duration-500 ${show4===false&&'rotate-180'}`}
                            onClick={() => {
                                setShow4(false)
                                setTimeout(() => setShowIcon4(false), 350)
                            }}
                        />
                        <AiOutlinePlus
                            className={`md:hidden ${showIcon4===false?'block':'hidden'} transition-transform duration-500 ${show4===true&&'-rotate-180'}`}
                            onClick={() => {
                                setShow4(true)
                                setTimeout(() => setShowIcon4(true), 350)
                            }}
                        />
                    </div>
                    <div className={`flex flex-col transition-all duration-500 md:max-h-full ${show4 === false ? 'max-h-0':'max-h-[140px]'}`}>
                        {
                            categories.map( el => (
                                <Link key={el._id} className={classItems} to={`/category/${el._id}`}>
                                    {el.name}
                                </Link>
                            ) )
                        }
                    </div>
                </div>
                <div className='flex flex-col bg-white'>
                    <div className='flex justify-between items-center pb-2 pt-4 md:pt-2'>
                        <h3 className='font-medium md:text-base'>Redes sociais</h3>
                        <AiOutlineMinus 
                            className={`md:hidden ${showIcon3===true?'block':'hidden'} transition-transform duration-500 ${show3===false&&'rotate-180'}`}
                            onClick={() => {
                                setShow3(false)
                                setTimeout(() => setShowIcon3(false), 350)
                            }}
                        />
                        <AiOutlinePlus
                            className={`md:hidden ${showIcon3===false?'block':'hidden'} transition-transform duration-500 ${show3===true&&'-rotate-180'}`}
                            onClick={() => {
                                setShow3(true)
                                setTimeout(() => setShowIcon3(true), 350)
                            }}
                        />
                    </div>
                    <div className={`flex flex-col text-sm text-gray-500/80 transition-all duration-500 ${show3 === false ? 'max-h-0':'max-h-16'}`}>
                        {
                            !!catalog.rsociais.insta && 
                            <Link 
                                to={catalog.rsociais.insta} 
                                target={'_blank'} 
                                className='gap-2 flex items-center rounded-full py-1'>
                                    <FaInstagramSquare className='w-[16.5px] h-[16.5px] text-gray-500' /> Instagram
                            </Link>
                        }
                        {
                            !!catalog.rsociais.face &&
                            <Link 
                                to={catalog.rsociais.face} 
                                target={'_blank'} 
                                className='gap-2 flex items-center rounded-full py-1'>
                                    <FaFacebookSquare className='w-[16px] h-[16px] text-gray-500'/> Facebook
                            </Link>
                        }
                        {
                            !!catalog.rsociais.yt &&
                            <Link 
                                to={catalog.rsociais.yt} 
                                target={'_blank'} 
                                className='gap-2 flex items-center rounded-full py-1'>
                                    <BsYoutube className='w-[17px] h-[17px] mt-0.5 text-gray-500'/> YouTube
                            </Link>
                        }
                        {
                            !!catalog.rsociais.tt &&
                            <Link 
                                to={catalog.rsociais.face} 
                                target={'_blank'} 
                                className='gap-2 flex items-start rounded-full py-1'>
                                    <FaFacebookSquare className='w-[16px] h-[16px] text-gray-500'/> Facebook
                            </Link>
                        }
                    </div>
                    
                </div>
            </div>
            <div className='flex gap-2.5 justify-center items-center bg-white py-8 md:py-0'>
                <div className='rounded-[2px] px-[12px] md:px-[11px] py-[6px] bg-blue-900'>
                    <img className=' w-[22px] h-[14px] md:w-[28px] md:h-[16px]' src={master} alt="" />
                </div>
                <div className='rounded-[2px] px-[6px] py-[7px] md:px-[7px] md:py-[8px] bg-white'>
                    <img className='w-[34px] h-[12px] md:w-[36px] md:h-3' src={visa} alt="" />
                </div>
                <div className='rounded-[2px] px-[2px] md:px-[1px] py-[4px] bg-[#b30810]'>
                    <img className='w-[42px] h-[18px] md:w-[48px] md:h-[20px]' src={hiper} alt="" />
                </div>
                <div className='rounded-[2px] px-[3px] md:px-[7px] md:py-[4px] bg-[#016fd0]'>
                    <img className='w-[40px] h-[26px] md:w-[36px] md:h-5' src={american} alt="" />
                </div>
                <div className='rounded-[2px] px-[10px] py-[5px] md:px-[9px] md:py-[4px] bg-indigo-500'>
                    <img className='w-[26px] h-[16px] md:w-[32px] md:h-[20px]' src={diners} alt="" />
                </div>
                <div className='rounded-[2px] px-[7px] py-[6px] md:px-[6px] md:py-[6px] bg-black'>
                    <img className='w-[32px] h-[14px] md:w-[38px] md:h-[16px]' src={elo} alt="" />
                </div>
            </div>
        </div>
        <div className='flex flex-col justify-between px-10 gap-y-5 py-6 border-t border-gray-300 text-xs items-center lg:px-32 lg:flex-row'>
            <p className='text-xs font-medium'>2023 © Todos os Direitos Reservados</p>
            <p className='font-medium text-xs'>Desenvolvido por: Vitor Vaz Andrade</p>
        </div>
        <Link 
            to={'https://www.instagram.com/artigos.decoracoes/'} 
            target={'_blank'} 
            className='w-12 h-12 md:w-[52px] md:h-[52px] bg-green-400 flex justify-center items-center rounded-full fixed bottom-5 right-4 md:right-8 md:bottom-8 xl:right-10'>
            <img className='w-5 h-5 xl:w-7 xl:h-7' src={whats} alt="Logo do whatsapp" />
        </Link>
    </section>
  )
}