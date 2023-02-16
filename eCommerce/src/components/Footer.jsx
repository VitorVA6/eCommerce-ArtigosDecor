import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import insta from '../assets/insta-logo.png'
import whats from '../assets/whats.png'

export default function Footer() {

  return (
    <section className='flex flex-col w-full bg-black text-white'>
        <div className='flex gap-x-32 w-full justify-center item-center py-16'>
            <div className='flex flex-col gap-y-2'>
                <h3 className='text-lg'>Informações</h3>
                <Link className='text-sm text-gray-200' to={'/about'}>Sobre</Link> 
            </div>
            <div className='flex flex-col gap-y-2'>
                <h3 className='text-lg'>Atendimento</h3>
                <h4 className='text-sm text-gray-200'>ctainarsouza@gmail.com</h4>
                <h4 className='text-sm text-gray-200'>{'(75)983333176'}</h4>
            </div>
            <Link to={'https://www.instagram.com/artigos.decoracoes/'} target={'_blank'} className='w-12 h-12 bg-gray-800 flex justify-center items-center rounded-full'>
                <img className='w-5 h-5' src={insta} alt="Logo do instagram" />
            </Link>
        </div>
        <div className='flex justify-between px-32 py-6 border-t border-t-gray-500 text-xs items-center'>
            <p>2023 © TODOS OS DIREITOS RESERVADOS</p>
            <p className='font-bold text-lg'>Vitor Vaz Andrade</p>
        </div>
        <Link to={'https://www.instagram.com/artigos.decoracoes/'} target={'_blank'} className='w-12 h-12 bg-gray-800 flex justify-center items-center rounded-full fixed bottom-4 right-4'>
            <img className='w-5 h-5' src={whats} alt="Logo do whatsapp" />
        </Link>
    </section>
  )
}
