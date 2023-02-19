import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ListaProdutos from '../components/ListaProdutos'
import NavLateral from '../components/NavLateral'
import { useCarrinhoContext } from '../contexts/Carrinho'

export default function Home() {

    const [categorias, setCategorias] = useState(
      [{nome:'Todos os produtos', id: 1}, 
      {nome:'Bandejas', id: 2}, 
      {nome:'Painéis de Led', id:3}, 
      {nome:'Vasos', id: 4}, 
      {nome:'Castiçais', id: 5}])
    const [produtos, setProdutos] = useState([])
    const [filtroCategoria, setFiltroCategoria] = useState(1)
    const [filtroPromocao, setFiltroPromocao] = useState(false)
    const {modalCarrinho} = useCarrinhoContext()
   

    useEffect( ()=>{
      const url = `/produtos/${filtroCategoria === 1 ? '' : ('?categoria='+filtroCategoria)}${(filtroPromocao === true && filtroCategoria === 1) ? '?promotion=true':''}${(filtroPromocao === true && filtroCategoria !== 1) ? '&promotion=true':''}`
      axios.get(url)
      .then( ({data}) => setProdutos(data) )
      .catch( erro => console.log(erro) )
    }, [filtroCategoria, filtroPromocao])

  return (
    
    <section className='flex'>
        <NavLateral 
          setCategoria={valor => setFiltroCategoria(valor)} 
          categorias={categorias}
          categoria={filtroCategoria}
          setFiltroPromocao={(valor) => setFiltroPromocao(valor)}
          filtroPromocao={filtroPromocao}
        />
        <ListaProdutos produtos={produtos} />
    </section>

  )
}
