import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useCatalogContext } from '../contexts/Catalog';
import { GrFormClose } from "react-icons/gr";

export default function PersoAdmin() {

  const [images, setImages] = useState([])
  const [uploadedImages, setUploadesImages] = useState([])

  const { catalog, getCatalog, setCatalog, updateCatalog, ToastContainer, notifyError, notifySucess } = useCatalogContext()

  useEffect( () => {

    getCatalog()
    setUploadesImages(catalog?.bannerdt)

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

      setUploadesImages( prev => prev.filter( img => img !== name ) )

  }

  return (
    <section className='flex items-center flex-col w-full h-screen'>
      <ToastContainer />
      <div className='flex flex-col w-full lg:w-3/4 bg-white py-5 px-4 lg:px-7 rounded-t-xl border border-gray-300/80 lg:border-gray-200/70'>
        <h2 className='mb-3 font-medium text-lg'>Informações</h2>
        <div className='flex flex-col w-full gap-2 mb-2.5'>
          <h3 className='text-sm font-medium'>Nome</h3>
          <input 
            type="text" 
            className='px-2 py-2.5 outline-none bg-gray-50 text-sm rounded-lg' 
            placeholder='Nome do seu negócio' 
            value={catalog.nome}
            onChange={(ev)=> {
              setCatalog( (prev) => {
                return {...prev, nome: ev.target.value}
              } )
          }}
          />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <h3 className='text-sm font-medium'>Número do Whatsapp</h3>
          <input 
            type="text" 
            className='px-2 py-2.5 outline-none bg-gray-50 text-sm rounded-lg' 
            placeholder='Através desse número seus clientes entrarão em contato' 
            value={catalog.whats}
            onChange={(ev)=> {
              setCatalog( (prev) => {
                return {...prev, whats: ev.target.value}
              } )
          }}
          />
        </div>
      </div>
      <div className='flex flex-col w-full lg:w-3/4 bg-white py-5 px-7 border border-gray-300/80 lg:border-gray-200/70'>
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
            uploadedImages?.map( image => (
              <div 
                  key = {image}
                  style={{ backgroundImage: `url(http://localhost:4000/images/carrosel/${image})`, boxSizing: 'border-box', backgroundSize: 'cover'}}
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


      <button 
        className='rounded-md bg-blue-500 text-white text-sm font-medium py-2.5 lg:py-3 w-fit px-10 mt-8'
        onClick={() => {
          updateCatalog(uploadedImages, images).then(data => {
            setUploadesImages(data.dados.bannerdt)
            setImages([])
            if(!!data.message){
              notifySucess(data.message)
            }
            else{
              notifyError(data.error)
            }
          })
        }}
      >
        Salvar alterações
      </button>
      
    </section>
  )
}
