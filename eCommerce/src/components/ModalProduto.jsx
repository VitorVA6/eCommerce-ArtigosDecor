import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useProductContext } from '../contexts/Product';
import { v4 as uuidv4 } from 'uuid';
import { GrFormClose } from "react-icons/gr";

export default function ModalProduto({setModalProduto, edit, categorias, idProduto}) {

    useEffect( () => {
        if (edit){
            getProductById(idProduto)
            .then( (data) => {
                setName(data.product.title) 
                setPrice(data.product.preco)
                setDesc(data.product.desc) 
                setCategory(data.product.categoria)
                setPriceoff(data.product.desconto)
                setUploadesImages(data.product.img)
            } )
            .catch(err => console.log(err))
        }
    },[idProduto] )

    const {addProduct, getProductById, updateProduct} = useProductContext()
    const [verMais, setVerMais] = useState(false);

    //estados dos inputs: nome, preço e etc
    const [name, setName] = useState('') 
    const [price, setPrice] = useState(0) 
    const [desc, setDesc] = useState('') 
    const [category, setCategory] = useState([])  
    const [priceoff, setPriceoff] = useState(0)
    const [images, setImages] = useState([])
    const [uploadedImages, setUploadesImages] = useState([])

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

    async function handleSubmit() {

        if(edit){
            updateProduct(idProduto, name, price, priceoff, category, desc, images, uploadedImages)
            .then( (data) => {
                setName(data.product.title) 
                setPrice(data.product.preco)
                setDesc(data.product.desc) 
                setCategory(data.product.categoria)
                setPriceoff(data.product.desconto)
                setUploadesImages(data.product.img)
                setImages([])
            } )
            .catch(err => console.log(err))
            return
        }
        
        addProduct(name, price, priceoff, category, desc, images)
        
    }

  return (

    <>
    <div 
      className=' w-screen h-screen bg-gray-400/50 absolute left-0 top-0 flex justify-center items-center z-10' 
      onClick={() => setModalProduto(false)}
    >
        
    </div>
    <div 
        className='slide-in-bottom h-fit bg-white flex flex-col items-center z-40 absolute rounded-2xl'
        style={{width: '650px',left: 'calc(50% - 325px)', top: 'calc(50% - 320px)'}}   
    >
        <h2 className='text-center py-4 border-b w-full font-medium'>{`${edit?'Editar':'Adicionar'} Produto`}</h2>
        <div className='flex flex-col py-2 px-7 w-full overflow-auto h-fit' style={{height: '470px'}}>
            <div className='flex gap-x-6'>
                <div className='flex flex-col  w-8/12 mb-6'>
                    <p className='mb-2 mt-2 text-sm font-medium'>Nome</p>
                    <input 
                        className='px-4 py-2.5 w-full outline-0 rounded-lg bg-gray-100 focus:border border-blue-400' 
                        type="text" 
                        placeholder='Ex: Camisa preta' 
                        value={name}
                        onChange = {(event) => setName(event.target.value)}    
                    />    
                </div>
                <div className='flex flex-col'>
                    <p className='mb-2 mt-2 text-sm font-medium'>Preço</p>
                    <input 
                        className='px-4 py-2.5 w-full outline-0 rounded-lg bg-gray-100 focus:border border-blue-400' 
                        type='number' 
                        value={price}
                        onChange={event => setPrice(event.target.value) }    
                    />    
                </div>
            </div>
            <div className='flex flex-col w-full mb-6'>
                <p className='mb-2 text-sm font-medium'>Descrição</p>
                <textarea 
                    className='px-4 py-2.5 w-full outline-0 rounded-lg bg-gray-100 focus:border border-blue-400' 
                    type="text" 
                    placeholder='Ex: Camiseta preta de algodão. Tamanhos P, M e G.' 
                    value={desc}
                    onChange={event => setDesc(event.target.value) }    
                />    
            </div>
            <div className='flex flex-col w-full'>
                <p className='mb-2 text-sm font-medium'>Categoria</p>
                <Select 
                    className='text-sm'                    
                    placeholder='Ex: Camisas, calças, meias'
                    isMulti 
                    options={categorias.map( element => {
                        return {value: element, label: element}                    
                        })}
                        
                    onChange = {(categorias) => {
                        setCategory(categorias.map( categoria => categoria.value ))
                    }}
                    value={category?.map(categoria => {
                        return {value: categoria, label: categoria}})}
                    /> 
            </div>
            {
                verMais && 
                <>
                <div className='flex flex-col w-1/3 mb-3'>
                    <p className='mb-2 mt-2 text-sm font-medium'>Desconto</p>
                    <input 
                        className='px-4 py-2.5 w-full outline-0 rounded-lg bg-gray-100 focus:border border-blue-400' 
                        type='number' 
                        value={priceoff}
                        onChange={event => setPriceoff(event.target.value) }    
                    />    
                </div>
                <div className='flex flex-col'>
                    <p className='mb-3 mt-2 text-sm font-medium'>Variações</p>
                    <button className='text-sm text-blue-500 font-medium w-full text-left'>Adicionar variações</button>
                </div>
                </>
            }
            <div className='align-text-top text-center py-4'>
                <button 
                    className='text-sm text-blue-500 font-medium w-full'
                    onClick={() => setVerMais(!verMais)}
                >{ `${verMais ? 'Menos opções' : 'Mais opções'}` }</button>
            </div>
        </div>

        <div className='flex flex-col items-center justify-between bg-gray-100 w-full px-6 py-4 rounded-b-2xl border-t'>
            <div className='flex gap-2  w-full mb-4'>
                {   edit ?
                    uploadedImages.map( image => (
                        <div 
                            key = {image}
                            style={{ backgroundImage: `url(http://localhost:4000/images/products/${image})`, boxSizing: 'border-box', backgroundSize: 'cover'}}
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
                    images.map( image => (
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

                <label className='border border-dashed border-gray-400/70 w-fit h-fit p-2.5 rounded-md cursor-pointer' 
                >
                    <input className='hidden' multiple={true} type='file' onChange={(ev) => handleFiles(ev)} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400/70">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </label>
                <button 
                    className='bg-blue-500 py-2.5 w-72 text-white text-medium rounded-lg'
                    onClick={(ev) => handleSubmit(ev)}
                >Confirmar</button>
            </div>
        </div>
    </div>
</>
  )
}
