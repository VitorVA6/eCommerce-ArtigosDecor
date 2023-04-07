import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import insta from '../assets/insta-logo.png'
import whats from '../assets/whats.png'
import {useCatalogContext} from '../contexts/Catalog'

export default function Footer() {

    const {catalog} = useCatalogContext()

  return (
    <section className='flex flex-col w-full bg-gray-800 text-white'>
        <div className='flex flex-col gap-y-7 gap-x-32 w-full justify-center items-center py-12 lg:flex-row lg:py-16'>
            <div className='flex flex-col gap-y-2 items-center'>
                <h3 className='text-xl'>Atendimento</h3>
                {
                catalog?.email !== ''?
                    <h4 className='text-sm text-gray-200'>{catalog.email}</h4>:
                    <></>
                }
                {
                catalog?.whats !== '' ?
                    <h4 className='text-sm text-gray-200'>{catalog.whats}</h4>:
                    <></>
                }
                
            </div>
           
            <div className='flex flex-col gap-y-3 items-center'>
                <h3 className='text-xl'>Redes sociais</h3>
                <Link to={'https://www.instagram.com/artigos.decoracoes/'} target={'_blank'} className='w-12 h-12 bg-gray-800 flex justify-center items-center rounded-full'>
                    <img className='w-5 h-5' src={insta} alt="Logo do instagram" />
                </Link>
            </div>
        </div>
        <div className='flex flex-col justify-between px-20 gap-y-8 py-6 border-t border-t-gray-500 text-xs items-center lg:px-32 lg:flex-row'>
            <p>2023 © TODOS OS DIREITOS RESERVADOS</p>
            <p className='font-bold text-lg'>Vitor Vaz Andrade</p>
        </div>
        <Link to={'https://www.instagram.com/artigos.decoracoes/'} target={'_blank'} className='w-12 h-12 bg-gray-800 flex justify-center items-center rounded-full fixed bottom-4 right-4'>
            <img className='w-5 h-5' src={whats} alt="Logo do whatsapp" />
        </Link>
    </section>
  )
}
