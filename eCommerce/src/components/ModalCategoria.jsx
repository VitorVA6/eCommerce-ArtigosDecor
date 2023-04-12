import React, { useEffect, useState } from 'react'
import { useCategoryContext } from '../contexts/Category'
import { v4 as uuidv4 } from 'uuid';
import { GrFormClose } from "react-icons/gr";

export default function ModalCategoria({setModalCategoria, edit, placeh, idCustom, notifySucess, notifyError}) {

  const {getCategoriesById, addCategory, categories, updateCategory} = useCategoryContext()
  const [category, setCategory] = useState('')
  const [image, setImage] = useState([])
  const [uploadedImage, setUploadesImage] = useState([])
  const [animate, setAnimate] = useState(true)

  useEffect( () => {

    if(edit){
      getCategoriesById(idCustom)
      .then( data =>  {
        setCategory(data.name)
        setUploadesImage([data.image])
      })
      .catch(err => console.log(err))
      
    }

  }, [] )

  function handleFiles(ev){
    const newImages = Array.from(ev.target.files).map( image => ({
        id: uuidv4(),
        file: image
    }) )
    setUploadesImage([])
    setImage(newImages)
}

  function removeFiles(id){

      setImage( prev => prev.filter( image => image.id !== id ) )

  }

function removeUploadedImages(name){

    setUploadesImage( prev => prev.filter( img => img !== name ) )

}

  function add(){

    if(edit){
      if(category.trim().length > 0 && categories.find(el => el.name === category) === undefined){
        updateCategory(idCustom, category, image, uploadedImage)
        .then( data => {
          if(!!data.message){
            setAnimate(false)
            setTimeout(() => setModalCategoria(false), 200) 
            notifySucess(data.message)
          }
          else{
            notifyError(data.error)
          }
        })       
      }else{
        notifyError('Categoria inválida.')
      }
      
      return
    }
    if(category.trim().length > 0 && categories.find(el => el.name === category) === undefined){
      addCategory(category, image).then(data => {
        if(!!data.message){
          setAnimate(false)
          setTimeout(() => setModalCategoria(false), 200) 
          notifySucess(data.message)
        }
        else{
          notifyError(data.error)
        }
      })
    }
    else{
      notifyError('Categoria inválida.')
    }
  }

  return (
    <>
    <div 
      className='w-screen h-screen bg-gray-400/50 absolute left-0 top-0 flex justify-center items-center z-10 overflow-hidden' 
      onClick={() => {
        setAnimate(false)
        setTimeout(() => setModalCategoria(false), 200) 
      }}
    >
        
    </div>
    <div 
        className={`${animate ? 'slide-in-bottom':'slide-out-bottom'} w-full lg:w-[450px] left-0 lg:left-[calc(50%-225px)] bottom-0 lg:top-[calc(50%-100px)] h-fit bg-white flex flex-col items-center z-20 absolute rounded-t-3xl lg:rounded-2xl`}
           
    >
        <h2 className='text-center py-4 border-b w-full font-medium'>{`${edit?'Editar':'Inserir'} categoria`}</h2>
        <div className='flex flex-col py-2 px-7 w-full'>
            <p className='mb-2 mt-2 text-sm font-medium'>Nome da categoria</p>
            <input 
              className='px-4 py-2 mb-6 w-full border outline-0 rounded-lg border-gray-300' 
              type="text" 
              placeholder={`${placeh}`} 
              value={category}
              onChange={(ev) => setCategory(ev.target.value)}
            />

            <div className='flex gap-2  w-full mb-4'>
                {   edit ?
                    uploadedImage.map( image => (
                        <div 
                            key = {image}
                            style={{ backgroundImage: `url(http://localhost:4000/images/categories/${image})`, boxSizing: 'border-box', backgroundSize: 'cover'}}
                            className='w-14 h-14 rounded-lg relative'
                            >
                            <button 
                                className='bg-white p-0.5 absolute -top-1.5 -right-1.5 rounded-full'
                                onClick={() => {removeUploadedImages(image)}}
                            >
                                <GrFormClose className='w-3.5 h-3.5'/>
                            </button>
                        </div>
                    ) ):<></>
                }
                {
                    image.map( image => (
                        <div 
                            key = {image.id}
                            style={{ backgroundImage: `url(${URL.createObjectURL(image.file)})`, boxSizing: 'border-box', backgroundSize: 'cover'}}
                            className='w-14 h-14 rounded-lg relative'
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

            <div className='flex justify-between items-center w-full'>
              <label className='border border-dashed border-gray-400/70 w-fit h-fit p-2.5 rounded-md cursor-pointer'>
                <input className='hidden' multiple={false} type='file' onChange={(ev) => handleFiles(ev)} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </label>
              <button 
                className='bg-blue-500 py-2 w-fit px-3 text-white text-medium rounded-lg'
                onClick={() => add()}
              >Confirmar</button>
            </div>
            
        </div>
        
    </div>
</>
  )
}