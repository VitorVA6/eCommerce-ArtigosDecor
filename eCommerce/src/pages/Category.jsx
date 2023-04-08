import React, { useEffect, useState } from 'react'
import {BiFilterAlt} from 'react-icons/bi'
import {BiChevronDown} from 'react-icons/bi'
import {BsGridFill} from 'react-icons/bs'
import {FaList} from 'react-icons/fa'
import {FiChevronRight} from 'react-icons/fi'
import { useProductContext } from '../contexts/Product'
import Card from '../components/Card'
import SliderFooter from '../components/SliderFooter'
import { Link, useParams } from 'react-router-dom'
import ModalOrder from '../components/ModalOrder'
import {useCatalogContext} from '../contexts/Catalog'

export default function Category() {

  const {getProducts, selCategory, setSelCategory} = useProductContext()
  const {catalog, getCatalog} = useCatalogContext()
  const [layout, setLayout] = useState('grid')
  const [produtos, setProdutos] = useState([])
  const [modalOrder, setModalOrder] = useState(false)
  const [selOrder, setSelOrder] = useState(0)

  const {name} = useParams()

  useEffect(() => {
    getCatalog()
    if(!!name){
      setSelCategory(name)
      getProducts(5, 1, name, selOrder)
      .then( data => {
        setProdutos(data)  
      })
      .catch(err => console.log(err))
    }
    
    
  }, [selOrder, name])

  return (
    <>
    <h3 className='hidden md:flex gap-1 items-center px-10 my-[28px] text-[13px]'>{`Página inicial`} <FiChevronRight className='w-[12px] h-[12px]'/> {`Armeiro`}</h3>
    <section className='flex md:grid md:grid-cols-10 overflow-x-hidden lg:gap-x-[30px] w-full md:px-10 pb-2 md:mb-16'>
      
      <div className='hidden lg:flex flex-col h-fit rounded-3xl px-[25px] py-[20px] bg-white shadow-md lg:shadow-gray-300/60 lg:col-span-3 xl:col-span-2'>
        <h2 className='text-center mb-[10px] text-xl font-medium'>Menu principal</h2>
        <ul className='flex flex-col gap-y-3 text-gray-900 text-sm my-3'>
          <Link to={'/'} className=''>Início</Link>
          {
            catalog?.categorias?.map(
              categoria => (
                <Link to={`/category/${categoria}`} className={`${name === categoria ? 'text-blue-500': ''}`}>{categoria}</Link>
              )
            )
          }
          <Link to={'/'} className=''>Entrar em contato</Link>
          <Link to={'/'} className=''>Sobre nós</Link>
        </ul>
      </div>

      <div className='flex flex-col w-full md:bg-white md:col-span-10 lg:col-span-7 xl:col-span-8 md:rounded-3xl lg:shadow-md lg:shadow-gray-300/60'>
        {
          modalOrder && 
          <ModalOrder setModalOrder={setModalOrder} selOrder={selOrder} setSelOrder={setSelOrder}/>
        }
        <div className='flex flex-col gap-1.5 px-7 py-6'>
          <h1 className='text-2xl font-medium'>{selCategory}</h1>
          <p className='text-xs text-gray-700/90'>{`${produtos.length} produtos`}</p>
        </div>      
        <div className='flex justify-between border-y border-gray-400/60 px-7 py-3 items-center text-sm text-gray-600'>
          <div className='flex gap-2 items-center cursor-pointer'>
            <BiFilterAlt className='w-6 h-6 text-black'/>
            <p>Filtrar</p>
          </div>
          <div 
            className='flex gap-1 items-center cursor-pointer'
            onClick={() => {setModalOrder(true)}}
          >
            <p>Ordenar por</p>
            <BiChevronDown className='w-6 h-6 text-black'/>
          </div>
          <div className='flex gap-2.5 items-center'>
            <BsGridFill 
              className={`w-5 h-5 ${layout === 'grid' ? 'text-black' : 'text-gray-600'}`}
              onClick={() => {
                setLayout('grid')
              }}
            />
            <FaList 
              className={`w-5 h-5 ${layout === 'list' ? 'text-black' : 'text-gray-600'}`}
              onClick={() => {
                setLayout('list')
              }}  
            />
          </div>
        </div>
        <div className={`grid ${layout === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} flex-col px-4 w-full gap-x-3 gap-y-4 py-6`}>
          {
            produtos?.map( produto => (
              <Card key={produto._id} produto={produto} categoryPage={true} layout = {layout}/>
            ) )
          }
        </div>
      </div>
    </section>
    <SliderFooter />
    </>
  )
}
