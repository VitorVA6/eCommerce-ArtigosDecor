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
    <section className='flex flex-col border border-y-0 overflow-x-hidden py-7 gap-y-2'>
        <div className='flex justify-between xl:justify-start items-end px-3 md:px-10 xl:px-32 gap-5'>
            <h2 className='font-medium text-[20px] md:text-[22px] 2xl-text-[25px] text-black/70 leading-none'>{title}</h2>
            <Link 
                to={`/category/${categoria}`} 
                className ='text-color-secundary text-sm xl:text-base font-medium leading-none xl:leading-none xl:mb-[1px]'
            >Ver todos</Link>
        </div>
        <div className='flex xl:grid grid-cols-4 2xl:grid-cols-5 gap-3.5 overflow-x-auto scrollbar-hide pb-0.5 pl-3 md:pl-10 xl:px-32'>
            {produtos?.map( (produto, index) => (
                index !== 4 && 
                <Card key={produto._id} page='h' produto={produto} layout={'grid'}/>
            ) )} 
            <div className='flex xl:hidden 2xl:flex w-full mr-10 xl:mr-0'>
            {
                produtos?.length === 5 && 
                <Card key={produtos[4]._id} page='h' produto={produtos[4]} layout={'grid'}/>
            }
            </div>
        </div>
    </section>
  )
}
