import React from 'react'
import { Link } from 'react-router-dom'
import insta from '../assets/insta-logo.png'
import whats from '../assets/whats.png'
import {FaFacebookSquare} from 'react-icons/fa'
import {useCatalogContext} from '../contexts/Catalog'
import {AiOutlinePlus} from 'react-icons/ai'

export default function Footer() {

    const {catalog} = useCatalogContext()
    const classItems = 'text-[13px] text-gray-200'

  return (
    <section className='flex flex-col w-full bg-gray-800 text-white'>
        <div className='grid md:grid-cols-3 gap-y-7 gap-x-32 w-full py-12 lg:py-12 px-10 md:px-20 xl:px-32'>

            <div className='flex flex-col gap-y-2'>
                <div className='flex justify-between items-center'>
                    <h3 className='font-medium'>Sobre</h3>
                    <AiOutlinePlus className='md:hidden'/>
                </div>
                
                <div className='flex flex-col gap-y-2'>
                    <Link to={'/about-us'} className={classItems}>Artigos Decor</Link>
                    <Link to={'/'} className={classItems}>Política de privacidade</Link>
                    <Link to={'/'} className={classItems}>Política de devolução</Link>
                </div>
                
            </div>

            <div className='flex flex-col gap-y-2'>
                <div className='flex justify-between items-center'>
                    <h3 className='font-medium'>Contato</h3>
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
                    <h3 className='font-medium'>Redes sociais</h3>
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
        <div className='flex flex-col justify-between px-20 gap-y-8 py-6 border-t border-t-gray-500 text-xs items-center lg:px-32 lg:flex-row'>
            <p>2023 © TODOS OS DIREITOS RESERVADOS</p>
            <p className='font-medium text-xs'>Desenvolvido por: Vitor Vaz Andrade</p>
        </div>
        <Link 
            to={'https://www.instagram.com/artigos.decoracoes/'} 
            target={'_blank'} 
            className='w-12 h-12 bg-blue-500 flex justify-center items-center rounded-full fixed bottom-8 right-12'>
            <img className='w-5 h-5' src={whats} alt="Logo do whatsapp" />
        </Link>
    </section>
  )
}
