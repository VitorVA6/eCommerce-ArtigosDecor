import React from 'react'

export default function InputFile({Icon, text='Upload', handleFiles, acc}) {
  return (
    <label className='cursor-pointer text-sm bg-blue-500 py-2.5 w-48 items-center flex justify-center rounded-md text-white gap-3 font-medium'>
            <input 
                className='hidden' 
                type='file' 
                multiple={false} 
                onChange={handleFiles} 
                accept={acc}
            />
            {Icon}
            {text}
        </label>
  )
}
