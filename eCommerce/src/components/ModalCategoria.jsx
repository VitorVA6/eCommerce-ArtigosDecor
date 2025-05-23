import React, { useEffect, useState } from 'react'
import { useCategoryContext } from '../contexts/Category'
import { v4 as uuidv4 } from 'uuid';
import LoadingButton from './LoadingButton';
import BaseModal from './BaseModal';
import InputAdmin from './InputAdmin';
import UploadImagesBlock from './UploadImagesBlock';
import {BsCardImage} from 'react-icons/bs'

export default function ModalCategoria({setModalCategoria, edit, placeh, idCustom, notifySucess, notifyError}) {
  const {getCategoriesById, addCategory, categories, updateCategory, removeCategory} = useCategoryContext()
  const [category, setCategory] = useState('')
  const [image, setImage] = useState([])
  const [uploadedImage, setUploadesImage] = useState([])
  const [animate, setAnimate] = useState(true)
  const [loading, setLoading] = useState(false)

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

  function closeModal(){
    setAnimate(false)
    setTimeout(() => setModalCategoria(false), 200) 
  }

  function handleFiles(files){
    if(files[0].type === 'image/jpeg' || files[0].type === 'image/png'){
      setImage([{
          id: uuidv4(),
          file: files[0]
      }]) 
      setUploadesImage([])
    }
    else{
      notifyError('Formato de arquivo inválido')
    }
}

  function removeFiles(id){
      setImage( prev => prev.filter( image => image.id !== id ) )
  }

  function checkCategory(){
    const categoryExist = categories.find(el => el.name === category)
    if(!categoryExist) return true
    else{
      if(categoryExist._id === idCustom) return true
    }
    return false
  }

  function checkCategoryAdd(){
    const categoryExist = categories.find(el => el.name === category)
    if(!categoryExist) return true
    return false
  }

function removeUploadedImages(name){
    setUploadesImage( prev => prev.filter( img => img !== name ) )
}

  function remove(){
    removeCategory(idCustom)
    .then(data => {
        if(!!data.message){
          closeModal()
          notifySucess(data.message)
        }
        else{
          notifyError(data.error)
        }
    })
  }

  function add(){
    if(edit){
      if(category.trim().length > 0 && checkCategory()){
        setLoading(true)
        updateCategory(idCustom, category, image, uploadedImage)
        .then( data => {
          setLoading(false)
          if(!!data.message){
            closeModal()
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
    if(category.trim().length > 0 && checkCategoryAdd()){
      setLoading(true)
      addCategory(category, image).then(data => {
        setLoading(false)
        if(!!data.message){
          closeModal()
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
    <BaseModal animate={animate} closeModal={closeModal} width={'lg:w-2/5'} top={'lg:top-1/4'}>
      <h2 className='text-center py-4 border-b w-full font-medium relative'>{`${edit?'Editar':'Inserir'} categoria`}</h2>
      <button 
          className={`${!edit && 'hidden'} text-red-500 font-normal absolute p-1 top-3 right-5`}
          onClick={() => remove()}
      >Excluir</button>
      <div className='flex flex-col py-2 px-7 w-full gap-8'>
        <InputAdmin width={'w-full'} title='Nome da categoria' value={category} setValue={v=>setCategory(v.target.value)} placeholder={placeh} type='text'/>
        <UploadImagesBlock uploadedImages={uploadedImage} removeUploadedImages={removeUploadedImages} 
            images={image} removeFiles={removeFiles}/>
          
          <div className='flex justify-between items-center w-full mb-2'>
            <label className='border border-dashed border-gray-400/70 w-fit h-fit px-2.5 py-2 rounded-md cursor-pointer'>
              <input className='hidden' multiple={false} type='file' onChange={(ev) => handleFiles(ev.target.files)} />
              <BsCardImage className="w-[22px] h-[22px] text-gray-400/70"/>
            </label>
            <LoadingButton 
              loading={loading} 
              text={'Confirmar'}
              handleSubmit={add}
              full={false}
              bg_color='bg-blue-500'
            />
          </div>
      </div>
    </BaseModal>
  )
}