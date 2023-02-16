import React from 'react'

export default function PageNotFound() {
  return (
    <section className='bg-black w-screen h-screen flex justify-center items-center'>
        <div className='flex'>
            <h1 className='text-white text-2xl font-medium py-2 px-4 border-r border-gray-400'>404</h1> 
            <h1 className='text-white text-2xl font-medium py-2 px-4'> Página não encontrada</h1>
        </div>
    </section>
  )
}
