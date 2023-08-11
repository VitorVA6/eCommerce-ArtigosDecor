import React, { useEffect, useState } from 'react'
import {BsGridFill} from 'react-icons/bs'
import {FaList} from 'react-icons/fa'
import {FiChevronRight} from 'react-icons/fi'
import { useProductContext } from '../contexts/Product'
import Card from '../components/Card'
import { useParams } from 'react-router-dom'

export default function Search() {
    const {getProducts} = useProductContext()
    const [layout, setLayout] = useState('grid')
    const [produtos, setProdutos] = useState([])
    const [hasNext, setHasNext] = useState(false)
    const [nextPage, setNextPage] = useState(1)
    const {name} = useParams()

    useEffect(() => {
        if(!!name){          
            getProducts(8, 1, 'all', 'false', name)
            .then( data => {
                setProdutos(data.docs)
                setHasNext(data.hasNextPage)
                setNextPage(data.nextPage)
            })
            .catch(err => console.log(err))
        }   
    }, [name])

  return (
    <div className='flex flex-col overflow-x-hidden px-5 md:px-10 xl:px-[60px]'>
        <h3 className='hidden md:flex gap-1 items-center my-[28px] text-[13px]'>{`Página inicial`} <FiChevronRight className='w-[12px] h-[12px]'/>Página de busca</h3>
        <div className='flex flex-col w-full md:bg-white md:col-span-10 lg:col-span-7 xl:col-span-8 md:rounded-3xl lg:shadow-md lg:shadow-gray-300/60 mb-10'>
            <div className='flex flex-col gap-1.5 px-7 py-6'>
            <h1 className='text-2xl font-medium'>{`Resultados para "${name}"`}</h1>
            <p className='text-xs text-gray-700/90'>{`${produtos.length} produtos`}</p>
            </div>      
            <div className='flex justify-between border-y border-gray-300/80 lg:border-t-transparent px-7 py-3 md:py-4 items-center text-[13px]'>
            <div className='flex gap-2.5 items-center'>
                <p>Visualização</p>
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
                        getProducts(8, nextPage, 'all', 'false', name)
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
  )
}
