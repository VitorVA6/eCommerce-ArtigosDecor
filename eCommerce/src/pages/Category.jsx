import React, { useEffect, useState } from 'react'
import {BiFilterAlt} from 'react-icons/bi'
import {BiChevronDown} from 'react-icons/bi'
import {BsGridFill} from 'react-icons/bs'
import {FaList} from 'react-icons/fa'
import {FiChevronRight} from 'react-icons/fi'
import { useProductContext } from '../contexts/Product'
import Card from '../components/Card'
import SliderFooter from '../components/SliderFooter'
import { Link, useParams, Navigate } from 'react-router-dom'
import ModalOrder from '../components/ModalOrder'
import Dropdown from '../components/DropDown'
import { useCategoryContext } from '../contexts/Category'
import CategoryFilter from '../components/CategoryFilter'

export default function Category() {

  const {getProducts, selCategory, setSelCategory} = useProductContext()
  const {getCategories, categories} = useCategoryContext()
  const [layout, setLayout] = useState('grid')
  const [produtos, setProdutos] = useState([])
  const [modalOrder, setModalOrder] = useState(false)
  const [selOrder, setSelOrder] = useState(0)
  const [carregado, setcarregado] = useState(false)
  const [hasNext, setHasNext] = useState(false)
  const [nextPage, setNextPage] = useState(1)
  const [show, setShow] = useState(false)
  const {name} = useParams()

  useEffect(() => {
    getCategories().then( data => {
      setcarregado(true)

    }).catch(err => console.log(err))

    if(!!name){          
      getProducts(5, 1, name, selOrder)
      .then( data => {
        setProdutos(data.docs)
        setHasNext(data.hasNextPage)
        setNextPage(data.nextPage)
      })
      .catch(err => console.log(err))
    }
        
       
  }, [selOrder, name])

  const defineTitle = () =>{
    if(name === 'destaques'){
      return 'Destaques'
    }else if(name === 'promocoes'){
      return 'Promoções'
    }
    else {
      return categories?.find( element => element?._id === name )?.name
    }
  }

  if((name !== 'destaques' && name !== 'promocoes') && (categories.find(el => el._id === name) === undefined) && carregado){
    return <Navigate to={'/404'}/>
  }   

  return (
    <>
    <h3 className='hidden md:flex gap-1 items-center px-10 my-[28px] text-[13px]'>{`Página inicial`} <FiChevronRight className='w-[12px] h-[12px]'/> {`Armeiro`}</h3>
    <section className='flex md:grid md:grid-cols-10 overflow-x-hidden lg:gap-x-[30px] w-full md:px-10 pb-2 md:mb-16'>
      {
        show === true &&
        <CategoryFilter categories={categories} name={name} show={show} setShow={setShow}/>
      }
      <div className={`hidden top-0 right-0 h-full absolute lg:static lg:flex flex-col lg:h-fit lg:rounded-3xl px-[25px] py-[20px] bg-white shadow-md lg:shadow-gray-300/60 lg:col-span-3 xl:col-span-2 z-30 lg:w-full`}>
        <h2 className='hidden lg:block text-center text-xl font-medium mb-2'>Menu principal</h2>
        <h2 className='block lg:hidden pl-6 text-xs font-bold border-y -mx-6 bg-gray-100 py-2'>CATEGORIAS</h2>
        <ul className='flex flex-col gap-y-3 text-gray-900 text-sm my-3'>
        <Link to={'/'} className='hidden lg:block'>Início</Link>
        {
            categories?.map(
            categoria => (
                <Link key={categoria._id} to={`/category/${categoria._id}`} className={`${name === categoria._id ? 'text-blue-500': ''}`}>{categoria.name}</Link>
            )
            )
        }
        <Link to={'/category/destaques'} className={`${name === 'destaques' ? 'text-blue-500': ''}`}>Destaques</Link>
        <Link to={'/category/promocoes'} className={`${name === 'promocoes' ? 'text-blue-500': ''}`}>Promocoes</Link>
        </ul>
        </div>
      <div className='flex flex-col w-full md:bg-white md:col-span-10 lg:col-span-7 xl:col-span-8 md:rounded-3xl lg:shadow-md lg:shadow-gray-300/60'>
        {
          modalOrder && 
          <ModalOrder setModalOrder={setModalOrder} selOrder={selOrder} setSelOrder={setSelOrder}/>
        }
        <div className='flex flex-col gap-1.5 px-7 py-6'>
          <h1 className='text-2xl font-medium'>{defineTitle()}</h1>
          <p className='text-xs text-gray-700/90'>{`${produtos.length} produtos`}</p>
        </div>      
        <div className='flex justify-between border-y border-gray-300/80 lg:border-t-transparent px-7 py-3 md:py-4 items-center text-[13px]'>
          <div 
            className='flex lg:hidden gap-2 items-center cursor-pointer'
            onClick={() => setShow(true)}
          >
            <BiFilterAlt className='w-6 h-6 text-black'/>
            <p>Filtrar</p>
          </div>
          <div 
            className='flex md:hidden gap-1 items-center cursor-pointer'
            onClick={() => {setModalOrder(true)}}
          >
            <p>Ordenar por</p>
            <BiChevronDown className='w-6 h-6 text-black'/>
          </div>
          <Dropdown />
          <div className='flex gap-2.5 items-center'>
            <p className='hidden md:block'>Visualização</p>
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
        {
            hasNext &&
            <div className='flex w-full justify-center'>
                <button 
                  className='bg-blue-500 py-3 w-1/2 text-white font-medium rounded-lg text-sm mb-6 mt-10'
                  onClick = {()=> {
                    getProducts(5, nextPage, name, selOrder)
                    .then( data => {
                      setHasNext(data.hasNextPage)
                      setNextPage(data.nextPage)
                      if((produtos.length > 0 && nextPage === 1)){
                        setProdutos([ ...data.docs])
                      }
                      else if(produtos.length < data.totalDocs){
                          setProdutos( prev => [...prev, ...data.docs])
                      }
                    })
                    .catch(err => console.log(err))
                  }}
                >Mostrar mais</button>
            </div>
          } 
      </div>
    </section>
    <SliderFooter />
    </>
  )
}
