import React from 'react'

export default function NavLateral( {categorias, setCategoria, categoria, setFiltroPromocao, filtroPromocao} ) {

  const handleClasses = (id) => {
    if(id === 'all'){
      return 'border-l-2 border-l-black'
    }
    if(id === categoria){
      return 'border-l-2 border-l-black'
    }
    else{
      return 'text-gray-500'
    }
  }

  const handlePromotion = (state) => {
    setFiltroPromocao( state )
  }

  const handleCategory = (id) => {
    setCategoria(id)
  }

  return (
    <section className='flex flex-col border border-b-0 py-8' style={{minWidth: '250px'}}>
        <div className='flex flex-col gap-y-3'>
            <h4 className='text-lg px-8'>Categorias</h4>
            {categorias.map( categoria => <h5 key={categoria}
                className={`text-base px-8 cursor-pointer ${handleClasses(categoria)}`}
                onClick={() => handleCategory(categoria)}
              >{categoria}</h5> )}
        </div>
        <div className='flex flex-col gap-y-3 my-10'>
          <h4 className='text-lg px-8'>Promoções</h4>
          <h5 className={`text-base px-8 cursor-pointer ${filtroPromocao? 'text-gray-500' : 'border-l-2 border-l-black'}`} onClick={() => handlePromotion(false)}>Todos</h5>
          <h5 className={`text-base px-8 cursor-pointer ${filtroPromocao? 'border-l-2 border-l-black' : 'text-gray-500'}`} onClick={() => handlePromotion(true)}>Somente promoção</h5>
        </div>
    </section>
  )
}
