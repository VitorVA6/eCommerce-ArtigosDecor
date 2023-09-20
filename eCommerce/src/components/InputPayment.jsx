import React from 'react'

export default function InputPayment({title, placeholder, field, setField, id, blur, width}) {

  return (
    <div className={`flex flex-col ${!!width && `${width}`}`}>
        {!!title && <h3 className='text-sm'>{title}</h3>}
        <input 
            type="text" 
            placeholder={placeholder} 
            className=' rounded-md border border-gray-300 outline-none py-3 px-4 text-sm mt-0.5'
            value={field}
            id = {id}
            onBlur={blur}
            onChange={setField}
        />
    </div>
  )
}
