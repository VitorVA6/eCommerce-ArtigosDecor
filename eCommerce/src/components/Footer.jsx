import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import insta from '../assets/insta-logo.png'
import whats from '../assets/whats.png'
import {FaFacebookSquare} from 'react-icons/fa'
import {useCatalogContext} from '../contexts/Catalog'
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import american from '../images/american.png'
import diners from '../images/diners.png'
import elo from '../images/elo.png'
import hiper from '../images/hiper.png'
import master from '../images/master.png'
import visa from '../images/visa.png'

export default function Footer() {

    const {catalog} = useCatalogContext()
    const classItems = 'text-[13px] text-gray-200 py-1'
    const [show, setShow] = useState(false)
    const [showIcon, setShowIcon] = useState(false)
    const [show2, setShow2] = useState(false)
    const [showIcon2, setShowIcon2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [showIcon3, setShowIcon3] = useState(false)    

  return (
    <section className='flex flex-col w-full bg-black text-white h-fit'>
        <div className='h-[7px] bg-gradient-to-r from-sky-500 to-indigo-500'></div>
        <div className='flex flex-col pt-8 pb-2 lg:py-12 md:gap-y-10'>

            <div className='grid md:grid-cols-3 w-full px-8 md:px-20 xl:px-32'>
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-medium md:text-lg'>Sobre</h3>
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
                    
                    <div className={`flex flex-col transition-all duration-500 ${show === false ? 'max-h-0':'max-h-[75px]'} md:max-h-fit`}>
                        <Link to={'/about-us'} className={classItems}>Artigos Decor</Link>
                        <Link to={'/devolution-policy'} className={classItems}>Política de reembolso</Link>
                        <Link to={'/privacy-policy'} className={classItems}>Política de privacidade</Link>
                    </div>
                    
                </div>

                <div className='flex flex-col bg-black'>
                    <div className='flex justify-between items-center pb-2 pt-4 md:pt-2'>
                        <h3 className='font-medium md:text-lg'>Atendimento</h3>
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
            
                <div className='flex flex-col bg-black'>
                    <div className='flex justify-between items-center pb-2 pt-4 md:pt-2'>
                        <h3 className='font-medium md:text-lg'>Redes sociais</h3>
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
                    <div className={`flex flex-col text-[13px] transition-all duration-500 ${show3 === false ? 'max-h-0':'max-h-16'}`}>
                        <Link 
                            to={'https://www.instagram.com/artigos.decoracoes/'} 
                            target={'_blank'} 
                            className='gap-2 flex items-center rounded-full text-gray-200 py-1'>
                                <img className='w-4 h-4' src={insta} alt="Logo do instagram" /> Instagram
                        </Link>
                        <Link 
                            to={'https://www.instagram.com/artigos.decoracoes/'} 
                            target={'_blank'} 
                            className='gap-2 flex items-start rounded-full text-gray-200  py-1'>
                                <FaFacebookSquare className='w-[16px] h-[16px] text-white'/> Facebook
                        </Link>
                    </div>
                    
                </div>
            </div>
            <div className='flex gap-3 justify-center items-center bg-black py-8 md:py-0'>
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
        <div className='flex flex-col justify-between px-10 gap-y-5 py-6 border-t border-t-gray-500 text-xs items-center lg:px-32 lg:flex-row'>
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