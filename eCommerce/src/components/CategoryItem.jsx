import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'

export default function CategoryItem({categoria}) {

    const [show, setSHow] = useState(false)
    const [translate, setTranslate] = useState('')
    const [opacity, setOpacity] = useState('opacity-0')

    useEffect( () =>{
        setTranslate(show === true && '-translate-x-2')
    }, [show] )

    return (
        <Link  
            to={`/category/${categoria._id}`} 
            className='flex flex-col items-center gap-y-2'
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
            <div className='p-2 md:p-[11px] lg:p-2 bg-white rounded-[70px] md:rounded-[80px] lg:rounded-[70px]'>
                <div 
                    className={`w-[110px] h-[110px] md:w-40 md:h-40 lg:h-36 lg:w-36 xl:w-32 xl:h-32 bg-cover bg-center rounded-full transition-transform ease-in duration-[0.4s] ${show===true?'scale-105':'scale-100'}`} 
                    style={{backgroundImage:`url(${import.meta.env.VITE_AWS_URL}${categoria.image})`}}/>
            </div>
            <div className='flex gap-2.5 items-center'>
                <h3 className={`ml-[26px] font-semibold ease-in transition-all duration-300 ${translate} ${show===true?'text-color-primary':'text-gray-600/80'} text-sm md:text-base`}>{categoria.name}</h3>
                <BsArrowRight className={`ease-in transition-all duration-300 ${translate} ${opacity} ${show===true&&'text-color-primary'}`}/>
            </div>
            </Link>
    )
}
