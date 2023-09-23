import React from 'react'
import SEO from '../components/SEO'

export default function PageNotFound() {
  return (
    <>
      <SEO
          title='Página Não Encontrada'
          description='A url é inválida ou não pertence a nenhum conteúdo desse domínio.'
          url = 'https://artigosdecor.render.com/404'
          canonical = 'https://artigosdecor.render.com/404'
          keywords = 'Not found, página não encontrada'
        />
      <section className='bg-black w-screen h-screen flex justify-center items-center'>
          <div className='flex'>
              <h1 className='text-white text-2xl font-medium py-2 px-4 border-r border-gray-400'>404</h1> 
              <h1 className='text-white text-2xl font-medium py-2 px-4'> Página não encontrada</h1>
          </div>
      </section>
    </>
  )
}
