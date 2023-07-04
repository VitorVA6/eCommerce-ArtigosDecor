import React from 'react'
import InputPayment from './InputPayment'

export default function PaymentBlock({step, title, desc, children}) {
  return (
    <div className='flex flex-col bg-white px-6 py-8 rounded-lg shadow-md'>
        <div className='flex gap-2 items-center'>
            <span className='bg-green-500 w-6 h-6 rounded-full text-sm flex justify-center items-center text-white font-bold mb-0.5'>{step}</span>
            <h2 className='text-[20px] font-bold'>{title}</h2>
        </div>
        <p className='text-sm my-2 text-gray-600'>
            {desc}
        </p>
        
        {children}

    </div>
  )
}
