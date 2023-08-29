import React, { useEffect, useState } from 'react'


export default function BaseModal({animate, closeModal, width, top, children}) {
    const [position, setPosition] = useState('translate-y-[1000px]')

    useEffect(() => {
        setTimeout( () => setPosition('translate-y-0'), 50 )
    }, [])

  return (
    <>
    <div 
    className='w-screen h-screen bg-gray-400/50 absolute left-0 top-0 flex justify-center items-center z-10 overflow-hidden' 
    onClick={() => closeModal()}
    >
        
    </div>
    <div 
        className={`${animate ? position :'translate-y-[1000px]'} transition-transform duration-500 w-full ${width} left-0 lg:left-1/2 lg:-translate-x-1/2 bottom-0  ${top} h-fit bg-white flex flex-col items-center z-20 absolute rounded-t-3xl lg:rounded-2xl`}
        onSubmit={() => console.log('aehooo')}
    >
        {children}
    </div>
    </>
  )
}
