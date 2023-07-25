import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import { useProductContext } from '../contexts/Product'

export default function ListaProdutos({title, categoria}) {

    const { getProducts } = useProductContext()
    const [produtos, setProdutos] = useState([])

    useEffect( ()=>{
        
        getProducts(5, 1, categoria)
        .then( data => {
            setProdutos(data?.docs)
        })
        .catch(err => console.log(err))

    }, [] )

  return (
    <section className='flex flex-col border border-y-0 overflow-x-hidden py-4 gap-y-2'>
        <div className='flex justify-between items-center px-5 md:px-10 xl:px-[60px]'>
            <div className='flex flex-col w-fit gap-0.5'>
                <h2 className='font-medium text-[21px]'>{title}</h2>
                <div className='w-11/12 h-1.5 bg-blue-500 rounded-full'></div>
            </div>
            <Link to={`/category/${categoria}`} className ='text-blue-500 text-sm font-medium'>Ver todos</Link>
        </div>
        
        <div className='flex gap-3.5 overflow-x-auto scrollbar-hide pb-0.5 pl-5 md:pl-10 xl:pl-[60px]'>
            {produtos?.map( produto => (
                <Card key={produto._id} categoryPage={false} produto={produto} layout={'grid'}/>
            ) )} 
        </div>
    </section>
  )
}
