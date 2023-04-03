import React, { useEffect, useState } from 'react'
import {BiFilterAlt} from 'react-icons/bi'
import {BiChevronDown} from 'react-icons/bi'
import {BsGridFill} from 'react-icons/bs'
import {FaList} from 'react-icons/fa'
import { useProductContext } from '../contexts/Product'
import Card from '../components/Card'
import SliderFooter from '../components/SliderFooter'
import { useParams } from 'react-router-dom'
import ModalOrder from '../components/ModalOrder'

export default function Category() {

  const {getProducts, selCategory, setSelCategory} = useProductContext()
  const [layout, setLayout] = useState('grid')
  const [produtos, setProdutos] = useState([])
  const [modalOrder, setModalOrder] = useState(false)
  const [selOrder, setSelOrder] = useState(0)

  const {name} = useParams()

  useEffect(() => {
    if(!!name){
      setSelCategory(name)
      getProducts(5, 1, name, selOrder)
      .then( data => {
        setProdutos(data)  
      })
      .catch(err => console.log(err))
    }
    
    
  }, [selOrder])

  return (
    <section className='flex flex-col overflow-x-hidden'>
      {
        modalOrder && 
        <ModalOrder setModalOrder={setModalOrder} selOrder={selOrder} setSelOrder={setSelOrder}/>
      }
      <div className='flex flex-col gap-1.5 px-7 py-8'>
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
      <div className={`grid ${layout === 'grid' ? 'grid-cols-2' : 'grid-cols-1'} flex-col px-4 w-full gap-x-3 gap-y-4 py-6 mb-8`}>
        {
          produtos?.map( produto => (
            <Card key={produto._id} produto={produto} categoryPage={true} layout = {layout}/>
          ) )
        }
      </div>
      <SliderFooter />
    </section>
  )
}
