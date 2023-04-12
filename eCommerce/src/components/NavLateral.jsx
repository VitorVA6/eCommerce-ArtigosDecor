import React from 'react'
import {Link} from 'react-router-dom'

export default function NavLateral( {categorias} ) {

  return (
    <section className='flex flex-col overflow-x-hidden mb-8 md:mb-10 mt-4 md:mt-0'>
        <div className='flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-10'>
            {categorias.map( categoria => (
              <Link key={categoria._id} to={`/category/${categoria._id}`} className='flex flex-col items-center gap-y-3'>
                <div className='p-1.5 bg-white rounded-[60px]'>
                  <div className='w-32 h-32 md:w-40 md:h-40 bg-cover bg-center rounded-full' style={{backgroundImage:`url(http://localhost:4000/images/categories/${categoria.image})`}}/>
                </div>
                <h3 className='text-gray-600 font-medium text-sm'>{categoria.name}</h3>
              </Link> )
              )}
        </div>
    </section>
  )
}
