import React, { useEffect, useState } from 'react'
import { useCatalogContext } from '../contexts/Catalog'

export default function About() {

    const {catalog} = useCatalogContext()
    const [text, setText] = useState([])

    useEffect(() => {
        setText(catalog.sobre.split('\n'))
    }, [catalog])

  return (
    <div className='flex flex-col py-16 px-32 gap-5'>
        <h1 className='font-bold text-[36px] text-center mb-6'>{`Sobre a ${catalog.nome}`}</h1>
        {
            text.map((el, index )=> {
                if(el !== ''){
                    return (
                        <p key={index}>
                            {`${el}`}
                        </p>
                    )
                }
            })
        }
    </div>
  )
}
