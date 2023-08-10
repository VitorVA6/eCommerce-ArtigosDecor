import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import { useProductContext } from '../contexts/Product'

export default function ListaProdutos({title, categoria, ordination}) {
    const { getProducts } = useProductContext()
    const [produtos, setProdutos] = useState([])

    useEffect( ()=>{    
        getProducts(5, 1, categoria, ordination)
        .then( data => {
            setProdutos(data?.docs)
        })
        .catch(err => console.log(err))
    }, [] )

  return (
    <section className='flex flex-col border border-y-0 overflow-x-hidden py-4 gap-y-2'>
        <div className='flex justify-between items-center px-5 md:px-10 xl:px-32'>
            <div className='flex flex-col w-fit gap-0.5'>
                <h2 className='font-bold text-[24px] text-black/70'>{title}</h2>
                <div className='w-11/12 h-1.5 bg-blue-500 rounded-full'></div>
            </div>
            <Link to={`/category/${categoria}`} className ='text-blue-500 text-sm font-medium'>Ver todos</Link>
        </div>
        <div className='flex xl:grid grid-cols-5 gap-3.5 overflow-x-auto scrollbar-hide pb-0.5 pl-5 md:pl-10 xl:px-32'>
            {produtos?.map( produto => (
                <Card key={produto._id} categoryPage={false} produto={produto} layout={'grid'}/>
            ) )} 
        </div>
    </section>
  )
}
