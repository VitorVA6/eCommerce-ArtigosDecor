import React from 'react'
import CategoryItem from './CategoryItem'

export default function NavLateral( {categorias} ) {

  return (
    <section className='flex flex-col overflow-x-hidden mb-8 md:mb-10 mt-4 md:mt-0 pl-3 md:pl-10 xl:pl-32'>
        <div className='flex gap-6 overflow-x-auto scrollbar-hide'>
            {categorias.map( categoria => (
               <CategoryItem key={categoria._id} categoria={categoria}/>
            )
            )}
        </div>
    </section>
  )
}
