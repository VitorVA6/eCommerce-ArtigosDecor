import React from 'react'

export default function PolicyPage({title, text}) {

  return (
    <div className='flex flex-col pt-8 md:pt-12 pb-28 bg-white text-black/80 px-6 md:px-10 xl:px-32 gap-5'>
        <h1 className='font-semibold text-[28px] md:text-[36px] text-center mb-2 md:mb-6'>{`${title}`}</h1>
        {text.split('\n').map((el, index) => {
            if(el !== ''){
                if(el.length > 60){
                    return (
                        <p className='text-gray-500/90 md:text-lg' key={index}>
                            {`${el}`}
                        </p>
                    )
                }else{
                    return (
                        <h2 key={index} className='text-[20px] text-gray-600 font-medium'>
                            {`${el}`}
                        </h2>
                    )
                }
                
            }
        })} 
    </div>
  )
}
