import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'
import { useCatalogContext } from '../contexts/Catalog'

export default function CategoryItem({categoria}) {

    const [show, setSHow] = useState(false)
    const [translate, setTranslate] = useState('')
    const [opacity, setOpacity] = useState('opacity-0')
    const {baseURL} = useCatalogContext()

    useEffect( () =>{
        setTranslate(show === true && '-translate-x-2')
    }, [show] )

    return (
        <Link  
            to={`/category/${categoria._id}`} 
            className='flex flex-col items-center gap-y-3'
            onMouseOver={() => {
                setSHow(true)
                setOpacity('opacity-100')
                setTranslate('-translate-x-2')
            }}
            onMouseLeave={() => {
                setSHow(false)
                setOpacity('opacity-0')
                setTranslate('')
            }}
            >
            <div className='p-2 md:p-[11px] lg:p-2 bg-white rounded-[70px]'>
                <div 
                    className={`w-[120px] h-[120px] md:w-40 md:h-40 lg:h-36 lg:w-36 xl:w-32 xl:h-32 bg-cover bg-center rounded-full transition-transform ease-in duration-[0.4s] ${show===true?'scale-105':'scale-100'}`} 
                    style={{backgroundImage:`url(${baseURL}/images/categories/${categoria.image})`}}/>
            </div>
            <div className='flex gap-2.5 items-center'>
                <h3 className={`ml-[26px] text-[15px] ease-in transition-all duration-300 ${translate} ${show===true&&'text-blue-500'}`}>{categoria.name}</h3>
                <BsArrowRight className={`ease-in transition-all duration-300 ${translate} ${opacity} ${show===true&&'text-blue-500'}`}/>
            </div>
            </Link>
    )
}
