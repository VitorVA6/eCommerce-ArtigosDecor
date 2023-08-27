import React, { useEffect } from 'react'
import {BsCheckLg} from 'react-icons/bs'


export default function SelectAdmin({setOption, option, text, shipOption}) {

    useEffect(() => {
        console.log(option, text, shipOption)
    }, [])

  return (
    <div className='flex gap-2 items-center'>
        <button 
            className={`w-[18px] h-[18px] flex justify-center items-center rounded-full bg-gray-100 border-2 ${shipOption === option ? 'border-blue-500' : 'border-gray-400'}`}
            onClick={() =>setOption(option)}
        >
            { shipOption === option && <BsCheckLg className='text-blue-500 w-3.5 h-3.5 mr-[1px]'/>}
        </button>
        <p className='text-black/90 text-[15px]'>{text}</p>
    </div>
  )
}
