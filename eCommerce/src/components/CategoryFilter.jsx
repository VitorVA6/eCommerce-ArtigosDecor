import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {IoMdClose} from 'react-icons/io'

export default function CategoryFilter({categories, name, setShow}) {

    const [animate, setAnimate] = useState(true)
    const [opacity, setOpacity] = useState(0)

    useEffect(()=>{
        setTimeout(() => setOpacity(100), 50) 
    }, [])

  return (
    <>
        <div 
            className={`transition-opacity ease-in duration-400 opacity-${opacity} w-screen h-screen bg-black/50 absolute left-0 top-0 flex justify-center items-center z-10 overflow-hidden lg:hidden`} 
            onClick={() => {
                setAnimate(false)
                setOpacity(0)
                setTimeout(() => setShow(false), 400) 
            }}
            >
                
        </div>
        <div className={`${animate===true?'slide-in-right':'slide-out-right'} lg:hidden w-[85%] top-0 right-0 h-full absolute lg:static lg:rounded-3xl px-[25px] py-[20px] bg-white shadow-md lg:shadow-gray-300/60 lg:col-span-3 xl:col-span-2 z-30 lg:w-full`}>
            <div className='flex gap-3 items-center mb-4 lg:hidden'>
                <IoMdClose 
                    className='flex lg:hidden w-7 h-7'
                    onClick={() => {
                        setAnimate(false)
                        setTimeout(() => setShow(false), 300) 
                    }}
                />
                <h2 className='text-center text-xl font-bold'>Filtros</h2>
            </div>
            <h2 className='hidden lg:block text-center text-xl font-medium mb-2'>Menu principal</h2>
            <h2 className='block lg:hidden pl-6 text-xs font-bold border-y -mx-6 bg-gray-100 py-2'>CATEGORIAS</h2>
            <ul className='flex flex-col gap-y-3 text-gray-900 text-sm my-3'>
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
    </>
  )
}
