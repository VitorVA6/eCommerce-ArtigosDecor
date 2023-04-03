import React, { useState } from 'react'

export default function MenuMobile({setMenu, catalog}) {

    const [animate, setAnimate] = useState(true)

  return (
    <>
    <div 
      className='w-screen h-screen bg-transparent absolute left-0 top-0 flex justify-center items-center z-10 overflow-hidden' 
      onClick={() => {
        setAnimate(false)
        setTimeout(() => setMenu(false), 400) 
      }}
    >
        
    </div>
    <div 
        className={`${animate ? 'slide-in-left':'slide-out-left'} h-screen w-3/4 bg-gray-700 flex flex-col items-start z-20 absolute top-0 left-0`}    
    >
        <div className='flex flex-col w-full h-32 bg-gray-800 p-7 justify-end'>
            <h1 className='text-white font-medium text-xl'>Explorar</h1>
            <h1 className='text-white font-medium text-2xl'>Artigos Decor</h1>
        </div>
        <div className='flex flex-col w-full p-7 gap-y-4'>
            <h2 className='font-medium text-xl'>Destaques</h2>
            <p className='cursor-pointer text-lg'><nobr>Em destaque</nobr></p>
            <p className='cursor-pointer text-lg'>Promoções</p>
            <p className='cursor-pointer text-lg'>Novidades</p>
        </div>
        <div className='flex flex-col w-full p-7 gap-y-4'>
            <h2 className='font-medium text-xl'>Categorias</h2>
            {
                catalog?.categorias?.map(categoria => (
                    <p key={categoria} className='cursor-pointer text-lg'>{categoria}</p>
                ))
            }
            
            
        </div>
    </div>
</>
  )
}
