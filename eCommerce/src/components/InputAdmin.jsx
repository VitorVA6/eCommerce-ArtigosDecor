import React from 'react'

export default function InputAdmin({width, title, value, setValue, placeholder, type}) {
  return (
    <div className={`flex flex-col ${width} mb-6`}>
        <p className='mb-2 mt-2 text-sm font-medium'>{title}</p>
        <input 
            className='px-4 py-2.5 w-full focus:outline outline-1 outline-blue-500 rounded-lg bg-gray-100' 
            type={type} 
            placeholder={placeholder} 
            value={value}
            onChange = {event => setValue(event.target.value)}    
        />    
    </div>
  )
}
