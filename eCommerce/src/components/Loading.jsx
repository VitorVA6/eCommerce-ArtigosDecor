import React from 'react'
import loading from '../images/carregando.png'

export default function Loading({loaded}) {
  return (
    <div className={`w-full h-full justify-center items-center py-32 ${loaded===true?'hidden':'flex'}`}>
        <img src={loading} className='w-20 h-20 animate-spin'/>
    </div>
  )
}
