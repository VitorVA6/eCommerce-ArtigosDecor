import React from 'react'

export default function InputPayment({title, placeholder}) {
  return (
    <div className='flex flex-col'>
        <h3 className='text-[13px]'>{title}</h3>
        <input 
            type="text" 
            placeholder={placeholder} 
            className=' rounded-md border border-gray-300 outline-none py-3 px-5 text-sm mt-1.5'
        />
    </div>
  )
}
