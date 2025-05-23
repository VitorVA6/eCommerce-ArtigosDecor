import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useCatalogContext } from '../contexts/Catalog';
import { GrFormClose } from "react-icons/gr";
import masks from '../utils/masks.js';
import notifies from '../utils/toastNotifies'
import LoadingButton from './LoadingButton';

export default function PersoAdmin() {
  const [images, setImages] = useState([])
  const { catalog, getCatalog, setCatalog, updateCatalog } = useCatalogContext()
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    getCatalog()
  }, [] )

  function handleFiles(ev){
    const newImages = Array.from(ev.target.files).map( image => ({
        id: uuidv4(),
        file: image
    }) )
    setImages( prev => prev.concat(newImages) )
}

  function removeFiles(id){
      setImages( prev => prev.filter( image => image.id !== id ) )
  }

  function removeUploadedImages(name){
    setCatalog( (prev) => {
      return {...prev, bannerdt: prev.bannerdt.filter(
        img => img !== name
      )}
    })
  }

  function handleSubmit(){
    setLoading(true)
    updateCatalog(catalog.bannerdt, images).then(data => {
      setLoading(false)
      setImages([])
      if(!!data.message){
        notifies.sucess(data.message)
        getCatalog()
      }
      else{
        notifies.error(data.error)
      }
    })
  }

  return (
    <section className='flex items-center flex-col w-full h-screen'>
      <notifies.Container />
      
      <div className='flex flex-col w-full lg:w-3/4 bg-white py-5 px-7 border rounded-xl border-gray-300/80 lg:border-gray-200/70 mb-10'>
        <h3 className='font-medium mb-1.5'>Banners</h3>
        <p className='text-sm text-gray-400 mb-2.5'>Adicione banners para destacar sua marca, promoções e mais.</p>
        <p className='text-sm mb-5'>Imagens dos banners</p>
        <div className='flex flex-wrap w-full gap-2'>
          <label className='bg-gray-100 w-32 h-20 lg:w-40 lg:h-24 rounded-xl flex items-center justify-center cursor-pointer'>
            <input className='hidden' multiple={true} type='file' onChange={(ev) => handleFiles(ev)} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </label>
          {
            catalog.bannerdt?.map( image => (
              <div 
                  key = {image}
                  style={{ backgroundImage: `url(${import.meta.env.VITE_AWS_URL}${image})`, boxSizing: 'border-box', backgroundSize: 'cover'}}
                  className='w-32 h-20 lg:w-40 lg:h-24 rounded-xl relative'
                  >
                  <button 
                      className='bg-white p-0.5 absolute -top-1.5 -right-1.5 rounded-full'
                      onClick={() => {removeUploadedImages(image)}}
                  >
                      <GrFormClose className='w-3.5 h-3.5'/>
                  </button>
              </div>
          ) )
      }
      {
          images.map( image => (
              <div 
                  key = {image.id}
                  style={{ backgroundImage: `url(${URL.createObjectURL(image.file)})`, boxSizing: 'border-box', backgroundSize: 'cover'}}
                  className='w-40 h-24 rounded-xl relative'
                  >
                  <button 
                      className='bg-white p-0.5 absolute -top-1.5 -right-1.5 rounded-full'
                      onClick={() => removeFiles(image.id)}
                  >
                      <GrFormClose className='w-3.5 h-3.5'/>
                  </button>
              </div>
          ) )
          }
        </div>
      </div>
        <LoadingButton loading={loading} text={'Salvar alterações'} handleSubmit={handleSubmit} full={false} bg_color='bg-blue-500'/>    
    </section>
  )
}