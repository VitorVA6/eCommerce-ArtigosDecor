import React from 'react'
import {Link} from 'react-router-dom'

export default function NavLateral( {categorias, setCategoria} ) {

  return (
    <section className='flex flex-col overflow-x-hidden mb-8 mt-4'>
        <div className='flex gap-6 overflow-x-auto scrollbar-hide px-6'>
            {categorias.map( categoria => (
              <Link key={categoria} to={`/category/${categoria}`} className='flex flex-col items-center gap-y-3'>
                <div className='p-1.5 bg-white rounded-[60px]'>
                  <div className='w-32 h-32 bg-cover bg-center rounded-full' style={{backgroundImage:`url(https://s2.glbimg.com/8WjMhMAzFD0a8QAhKrmR9zUx_RI=/smart/e.glbimg.com/og/ed/f/original/2021/04/06/livros-saude-mental.jpg)`}}/>
                </div>
                <h3 className='text-gray-600 font-medium text-sm'>{categoria}</h3>
              </Link> )
              )}
        </div>
    </section>
  )
}
