import React, { useEffect, useState } from 'react'
import { useCatalogContext } from '../contexts/Catalog'

export default function ModalCategoria({setModalCategoria, edit, placeh, idCustom, notifySucess, notifyError}) {

  const {setCatalog, updateCatalog, catalog} = useCatalogContext()
  const [category, setCategory] = useState('')
  const [animate, setAnimate] = useState(true)

  useEffect( () => {

    if(edit){
      setCategory(catalog.categorias[idCustom])
    }

  }, [] )

  function addCatagory(){

    if(edit){
      let categoriasAux = catalog.categorias.filter( (element, index) => {
        if (index !== idCustom){
          return element
        }
      } )

      if(category.trim().length > 0 && !categoriasAux.includes(category)){
        categoriasAux = catalog.categorias.map( (element, index) => {
          if (index === idCustom){
            return category
          }
          return element
        } )
        const catalogAtt = { ...catalog, categorias: categoriasAux }
        
        setCatalog(catalogAtt)
        updateCatalog(catalogAtt).then(data => {
          if(!!data.message){
            setAnimate(false)
            setTimeout(() => setModalCategoria(false), 400) 
            notifySucess(data.message)
          }
          else{
            notifyError(data.error)
          }
        })
      }
      return
    }

    const catalogAtt = {...catalog, categorias: [...catalog.categorias, category]}
    console.log(catalogAtt)
    if(category.trim().length > 0 && !catalog.categorias.includes(category)){
      setCatalog(catalogAtt)
      updateCatalog(catalogAtt).then(data => {
        if(!!data.message){
          setAnimate(false)
          setTimeout(() => setModalCategoria(false), 400) 
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
      className=' w-screen h-screen bg-gray-400/50 absolute left-0 top-0 flex justify-center items-center z-10 overflow-hidden' 
      onClick={() => {
        setAnimate(false)
        setTimeout(() => setModalCategoria(false), 400) 
      }}
    >
        
    </div>
    <div 
        className={`${animate ? 'slide-in-bottom':'slide-out-top'} h-fit bg-white flex flex-col items-center z-20 absolute rounded-2xl`}
        style={{width: '450px',left: 'calc(50% - 225px)', top: 'calc(50% - 100px)'}}    
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
            <button 
              className='bg-blue-500 py-2 w-full text-white text-medium rounded-lg mb-4'
              onClick={() => addCatagory()}
            >Confirmar</button>
        </div>
        
    </div>
</>
  )
}