import React from 'react'

export default function PolicyPage({title, text}) {

  return (
    <div className='flex flex-col py-16 px-32 gap-5'>
        <h1 className='font-bold text-[36px] text-center mb-6'>{`${title}`}</h1>
        {text.split('\n').map((el, index) => {
            if(el !== ''){
                if(el.length > 60){
                    return (
                        <p key={index}>
                            {`${el}`}
                        </p>
                    )
                }else{
                    return (
                        <h2 key={index} className='text-[24px] font-medium'>
                            {`${el}`}
                        </h2>
                    )
                }
                
            }
        })}
    </div>
  )
}
