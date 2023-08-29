import React from 'react'
import {BsCheckLg} from 'react-icons/bs'

export default function SelectAdmin({ option, text, selectedOption, setSelectedOption}) {

  return (
    <div className='flex gap-2 items-center'>
        <button 
            className={`w-[16px] h-[16px] flex justify-center items-center rounded-full bg-gray-100 border-2 ${selectedOption === option ? 'border-blue-500' : 'border-gray-400'}`}
            onClick={setSelectedOption}
        >
            { selectedOption === option && <BsCheckLg className='text-blue-500 w-3.5 h-3.5 mr-[0.5px] mt-[0.5px]'/>}
        </button>
        <p className='text-black/90 text-sm'>{text}</p>
    </div>
  )
}
