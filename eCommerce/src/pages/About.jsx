import React, { useEffect, useState } from 'react'
import { useCatalogContext } from '../contexts/Catalog'
import SEO from '../components/SEO'
import parse from 'html-react-parser'

export default function About() {

    const {catalog} = useCatalogContext()
    const [text, setText] = useState([])

    useEffect(() => {
        setText(catalog.sobre.split('\n'))
    }, [catalog])

  return (
    <>
    <SEO
        title={`Sobre a Artigos Decor`}
        url = {`https://artigosdecor.render.com/about-us`}
        canonical = {`https://artigosdecor.render.com/about-us`}
    />
    <div className='flex flex-col py-12 px-32 gap-5 text-black/80 bg-white'>
        <h1 className='font-semibold text-[36px] text-center mb-6'>{`Sobre a ${catalog.nome}`}</h1>
        <p style={{whiteSpace: "pre-wrap"}}>
            {parse(catalog.sobre)}
        </p>
    </div>
    </>
  )
}
