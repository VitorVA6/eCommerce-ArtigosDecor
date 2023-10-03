import React, { useEffect, useState } from 'react'
import { useCatalogContext } from '../contexts/Catalog'
import SEO from '../components/SEO'
import parse from 'html-react-parser'

export default function About() {

    const {catalog} = useCatalogContext()

  return (
    <>
    <SEO
        title={`Sobre a Artigos Decor`}
        url = {`https://artigosdecor.render.com/about-us`}
        canonical = {`https://artigosdecor.render.com/about-us`}
    />
    <div className='flex flex-col pt-8 md:pt-12 pb-28 px-6 md:px-10 xl:px-32 gap-5 text-black/80 bg-white'>
        <h1 className='font-semibold text-[28px] lg:text-[36px] text-center mb-2 md:mb-6'>{`Sobre a ${catalog.nome}`}</h1>
        <div  
            className='text-gray-500/90 md:text-lg'
            style={{whiteSpace: "pre-wrap"}}>
            {parse(catalog.sobre)}
        </div>
    </div>
    </>
  )
}
