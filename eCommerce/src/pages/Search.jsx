import React, { useEffect, useState } from 'react'
import {BsGridFill} from 'react-icons/bs'
import {FaList} from 'react-icons/fa'
import {FiChevronRight} from 'react-icons/fi'
import { useProductContext } from '../contexts/Product'
import Card from '../components/Card'
import { useParams } from 'react-router-dom'
import SEO from '../components/SEO'

export default function Search() {
    const {getProducts} = useProductContext()
    const [layout, setLayout] = useState('grid')
    const [produtos, setProdutos] = useState([])
    const [hasNext, setHasNext] = useState(false)
    const [nextPage, setNextPage] = useState(1)
    const {name, category} = useParams()

    useEffect(() => {
        if(!!name && !!category){          
            getProducts(8, 1, category, 'false', name)
            .then( data => {
                setProdutos(data.docs)
                setHasNext(data.hasNextPage)
                setNextPage(data.nextPage)
            })
            .catch(err => console.log(err))
        }   
    }, [name, category])

  return (
    <>
    <SEO
        title='Busca'
        description='Busque por um produto'
        url = {`https://artigosdecor.render.com/search/${category}/${name}`}
        canonical = {`https://artigosdecor.render.com/search/${category}/${name}`}
        keywords = 'busca, artigos decor'
    />
    <div className='flex flex-col overflow-x-hidden md:px-10 xl:px-32'>
        <h3 className='hidden md:flex gap-1 items-center my-[28px] text-sm text-black/80'>
            <p>Página iInicial</p> 
            <FiChevronRight className='w-3.5 h-3.5 text-gray-500 mt-0.5'/>
            Busca
        </h3>
        <div className='flex flex-col w-full md:bg-white md:col-span-10 lg:col-span-7 xl:col-span-8 md:rounded-md lg:shadow-md lg:shadow-gray-300/60 mb-10 text-black/80'>
            <div className='flex flex-col gap-1.5 px-3 md:px-[25px] py-6'>
                <h1 className='text-2xl font-medium'>{`Resultados para "${name}"`}</h1>
                <p className='text-xs text-gray-700/90'>{`${produtos.length} produtos`}</p>
            </div>      
            <div className='flex justify-between border-y border-gray-300/80 lg:border-t-transparent px-3 md:px-[25px] py-3 md:py-4 items-center text-[13px]'>
            <div className='flex gap-2.5 items-center'>
                <p>Visualização</p>
                <BsGridFill 
                className={`w-5 h-5 cursor-pointer ${layout === 'grid' ? 'text-black/80' : 'text-gray-400'}`}
                onClick={() => {
                    setLayout('grid')
                }}
                />
                <FaList 
                className={`w-5 h-5 cursor-pointer ${layout === 'list' ? 'text-black' : 'text-gray-400'}`}
                onClick={() => {
                    setLayout('list')
                }}  
                />
            </div>
            </div>
            <div className={`grid ${layout === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1'} flex-col px-3 md:px-[25px] w-full gap-x-2 gap-y-6 py-10`}>
            {
                produtos?.map( produto => (
                <Card key={produto._id} produto={produto} page='s' layout = {layout}/>
                ) )
            }
            </div>
            {
                hasNext &&
                <div className='flex w-full justify-center'>
                    <button 
                    className='bg-color-primary py-3 w-1/2 text-white font-medium rounded-lg text-sm mb-6 mt-10'
                    onClick = {()=> {
                        getProducts(8, nextPage, category, 'false', name)
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
      </div>
    </>
  )
}
