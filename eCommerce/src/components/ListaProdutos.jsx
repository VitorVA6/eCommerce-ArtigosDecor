import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'

export default function ListaProdutos({produtos, title}) {

    

  return (
    <section className='flex flex-col border border-y-0 overflow-x-hidden py-4 gap-y-2'>
        <div className='flex justify-between items-center px-5 md:px-10'>
            <div className='flex flex-col w-fit gap-0.5'>
                <h2 className='font-medium text-xl'>{title}</h2>
                <div className='w-11/12 h-1.5 bg-blue-500 rounded-full'></div>
            </div>
            <Link className ='text-blue-500 text-sm font-medium'>Ver todos</Link>
        </div>
        
        <div className='flex gap-3.5 overflow-x-auto scrollbar-hide px-5 pb-0.5 md:px-10'>
            {produtos.map( produto => (
                <Card key={produto._id} categoryPage={false} produto={produto} layout={'grid'}/>
            ) )} 
        </div>
    </section>
  )
}
