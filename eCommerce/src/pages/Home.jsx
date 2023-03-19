import React, { useEffect, useState } from 'react'
import ListaProdutos from '../components/ListaProdutos'
import NavLateral from '../components/NavLateral'
import { useCatalogContext } from '../contexts/Catalog'
import {useProductContext} from '../contexts/Product'

export default function Home() {

    const {catalog, getCatalog} = useCatalogContext()
    const {getProducts, produtos} = useProductContext()

    const [filtroCategoria, setFiltroCategoria] = useState('Todos os produtos')
    const [filtroPromocao, setFiltroPromocao] = useState(false)
    const [hasNext, setHasNext] = useState(false)
    const [nextPage, setNextPage] = useState(1)

    useEffect( ()=>{
      getCatalog()
    }, [] )

    useEffect( ()=>{
      
      getProducts(5, 1, filtroCategoria === 'Todos os produtos'?'all':filtroCategoria, filtroPromocao)
      .then( data => {
        setHasNext(data.hasNextPage)
        setNextPage(data.nextPage)
      })
      .catch(err => console.log(err))
      
    }, [filtroCategoria, filtroPromocao])

  return (
    
    <section className='flex'>
      
        <NavLateral 
          setCategoria={valor => setFiltroCategoria(valor)} 
          categorias={['Todos os produtos', ...catalog.categorias]}
          categoria={filtroCategoria}
          setFiltroPromocao={(valor) => setFiltroPromocao(valor)}
          filtroPromocao={filtroPromocao}
        />
        <div className='flex flex-col items-center w-full'>        
          <ListaProdutos produtos={produtos} />      
          {
            hasNext &&
            <button 
              className='bg-black py-2.5 px-8 text-white font-medium rounded-lg text-sm'
              onClick = {()=> {
                getProducts(5, nextPage, filtroCategoria === 'Todos os produtos'?'all':filtroCategoria, filtroPromocao)
                .then( data => {
                  setHasNext(data.hasNextPage)
                  setNextPage(data.nextPage)
                })
                .catch(err => console.log(err))
              }}
            >Mostrar mais</button>
          } 
        </div>
        
    </section>

  )
}
