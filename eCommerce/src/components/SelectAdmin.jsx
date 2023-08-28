import React from 'react'
import {BsCheckLg} from 'react-icons/bs'
import { useCatalogContext } from '../contexts/Catalog'


export default function SelectAdmin({ option, text}) {

  const {setCatalog, catalog} = useCatalogContext()

  return (
    <div className='flex gap-2 items-center'>
        <button 
            className={`w-[16px] h-[16px] flex justify-center items-center rounded-full bg-gray-100 border-2 ${catalog.ship_option === option ? 'border-blue-500' : 'border-gray-400'}`}
            onClick={() =>setCatalog( prev => ({...prev, ship_option: option}))}
        >
            { catalog.ship_option === option && <BsCheckLg className='text-blue-500 w-3.5 h-3.5 mr-[1px] mt-[1px]'/>}
        </button>
        <p className='text-black/90 text-[15px]'>{text}</p>
    </div>
  )
}
