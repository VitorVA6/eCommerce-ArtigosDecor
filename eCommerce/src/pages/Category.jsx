import React, { useEffect, useState } from 'react'
import {BiFilterAlt} from 'react-icons/bi'
import {BiChevronDown} from 'react-icons/bi'
import {BsGridFill} from 'react-icons/bs'
import {FaList} from 'react-icons/fa'
import {FiChevronRight} from 'react-icons/fi'
import { useProductContext } from '../contexts/Product'
import Card from '../components/Card'
import { Link, useParams, Navigate } from 'react-router-dom'
import ModalOrder from '../components/ModalOrder'
import Dropdown from '../components/DropDown'
import { useCategoryContext } from '../contexts/Category'
import CategoryFilter from '../components/CategoryFilter'
import SEO from '../components/SEO'

export default function Category() {

  const {getProducts} = useProductContext()
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
      getProducts(8, 1, name, selOrder)
      .then( data => {
        if(name === 'lancamentos'){
          setProdutos(data.docs)
          setHasNext(null)
          setNextPage(null)
        }else{
          setProdutos(data.docs)
          setHasNext(data.hasNextPage)
          setNextPage(data.nextPage)
        }
      })
      .catch(err => console.log(err))
    }
        
       
  }, [selOrder, name])

  const defineTitle = () =>{
    if(name === 'destaques'){
      return 'Destaques'
    }else if(name === 'promocoes'){
      return 'Promoções'
    }else if(name === 'lancamentos'){
      return 'Lançamentos'
    }
    else {
      return categories?.find( element => element?._id === name )?.name
    }
  }

  if((name !== 'destaques' && name !== 'promocoes' && name !== 'lancamentos') && (categories.find(el => el._id === name) === undefined) && carregado){
    return <Navigate to={'/404'}/>
  }   

  return (
    <>
    <SEO  
        title={`${defineTitle()}`}
        description={`Caso você esteja procurando por ${defineTitle()} para decorar sua festa, aqui você encontra o perfeito para você, com o menor preço`}
        url = {`https://artigosdecor.render.com/${name}`}
        canonical = {`https://artigosdecor.render.com/${name}`}
        keywords = {`${defineTitle()}`}
    />
    <h3 className='hidden md:flex gap-1 items-center md:px-10 xl:px-32 my-[28px] text-sm text-black/80'>
      <p>Página Inicial</p> 
      <FiChevronRight className='w-3.5 h-3.5 text-gray-500 mt-0.5'/> 
      <p>Categorias</p></h3>
    <section className='flex md:grid md:grid-cols-10 lg:grid-cols-12 overflow-x-hidden lg:gap-x-7 w-full px-0 md:px-10 xl:px-32 pb-10 md:mb-24 text-black/90'>
      {
        show === true &&
        <CategoryFilter categories={categories} name={name} show={show} setShow={setShow}/>
      }
      <div className={`hidden top-0 right-0 h-full absolute lg:static lg:flex flex-col lg:h-fit lg:rounded-md px-[25px] py-6 bg-white shadow-lg lg:shadow-gray-300/40 lg:col-span-3 xl:col-span-3 z-30 lg:w-full`}>
        <h2 className='hidden lg:block text-center text-[22px] xl:text-[24px] font-medium mb-2'>Menu principal</h2>
        <h2 className='block lg:hidden pl-6 text-xs font-bold border-y -mx-6 bg-gray-100 py-2'>CATEGORIAS</h2>
        <ul className='flex flex-col gap-y-3 text-gray-500 text-sm my-3'>
        <Link to={'/'} className='hidden lg:block'>Início</Link>
        {
            categories?.map(
            categoria => (
                <Link key={categoria._id} to={`/category/${categoria._id}`} className={`${name === categoria._id ? 'text-color-primary': ''}`}>{categoria.name}</Link>
            )
            )
        }
        <Link to={'/category/destaques'} className={`${name === 'destaques' ? 'text-color-primary': ''}`}>Destaques</Link>
        <Link to={'/category/promocoes'} className={`${name === 'promocoes' ? 'text-color-primary': ''}`}>Promocoes</Link>
        <Link to={'/category/lancamentos'} className={`${name === 'lancamentos' ? 'text-color-primary': ''}`}>Lançamentos</Link>
        </ul>
        </div>
      <div className='flex flex-col w-full md:bg-white md:col-span-10 lg:col-span-9 xl:col-span-9 md:rounded-md lg:shadow-lg lg:shadow-gray-300/40'>
        {
          modalOrder && 
          <ModalOrder setModalOrder={setModalOrder} selOrder={selOrder} setSelOrder={setSelOrder}/>
        }
        <div className='flex flex-col gap-0.5 px-3 md:px-[25px] py-5'>
          <h1 className='text-[22px] xl:text-2xl font-medium'>{defineTitle()}</h1>
          <p className='text-sm lg:text-base text-gray-500'>{`${produtos.length} produtos`}</p>
        </div>      
        <div className='flex justify-between border-y border-gray-300/80 lg:border-t-transparent px-3 md:px-[25px] py-2 md:py-4 items-center text-sm'>
          <div 
            className='flex lg:hidden gap-2 items-center cursor-pointer'
            onClick={() => setShow(true)}
          >
            <BiFilterAlt className='w-6 h-6 text-black/90'/>
            <p>Filtrar</p>
          </div>
          <div 
            className='flex md:hidden gap-1 items-center cursor-pointer'
            onClick={() => {setModalOrder(true)}}
          >
            <p>Ordenar por</p>
            <BiChevronDown className='w-5 h-5 mt-0.5 text-black/90'/>
          </div>
          {
          name !== 'lancamentos' &&
          <Dropdown />
          }
          <div className='flex gap-2.5 items-center'>
            <p className='hidden md:block text-sm'>Visualização</p>
            <BsGridFill 
              className={`w-5 h-5 ${layout === 'grid' ? 'text-black/80' : 'text-gray-400'} cursor-pointer`}
              onClick={() => {
                setLayout('grid')
              }}
            />
            <FaList 
              className={`w-5 h-5 ${layout === 'list' ? 'text-black/80' : 'text-gray-400'} cursor-pointer`}
              onClick={() => {
                setLayout('list')
              }}  
            />
          </div>
        </div>
        <div className={`grid ${layout === 'grid' ? 'grid-cols-2 md:grid-cols-3 2xl:grid-cols-4' : 'grid-cols-1'} flex-col px-3 md:px-[25px] w-full gap-x-2 gap-y-6 py-6`}>
          {
            produtos?.map( produto => (
              <Card key={produto._id} produto={produto} page='c' layout = {layout}/>
            ) )
          }
        </div>
        {
            hasNext &&
            <div className='flex w-full justify-center'>
                <button 
                  className='bg-color-primary py-3 w-1/2 text-white font-medium rounded-lg text-sm mb-6 mt-10'
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
    </>
  )
}
