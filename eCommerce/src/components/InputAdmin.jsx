import React from 'react'

export default function InputAdmin({
    id=null,
    handleBlur = () => {},
    width='w-full', 
    title, 
    value, 
    setValue, 
    placeholder, 
    type='text'}) {
  return (
    <div className={`flex flex-col ${width}`}>
        {!!title && <p className='mb-2 text-sm font-medium'>{title}</p>}
        <input 
            id = {id}
            onBlur={handleBlur} 
            className='px-4 py-2.5 w-full focus:outline outline-1 outline-blue-500 rounded-lg bg-gray-100' 
            type={type} 
            placeholder={placeholder} 
            value={value}
            onChange = {setValue}    
        />    
    </div>
  )
}
