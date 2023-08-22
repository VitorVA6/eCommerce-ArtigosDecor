import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useProductContext } from '../contexts/Product';
import { v4 as uuidv4 } from 'uuid';
import { GrFormClose } from "react-icons/gr";
import { useVariationContext } from '../contexts/Variation';
import combine from '../utils/combine';
import masks from '../utils/masks';

export default function ModalProduto({setModalProduto, edit, categorias, idProduto, notifySucess, notifyError}) {
    const {addProduct, getProductById, updateProduct} = useProductContext()
    const {getVariations, variations} = useVariationContext()
    const [verMais, setVerMais] = useState(false);
    const [animate, setAnimate] = useState(true)
    const [name, setName] = useState('') 
    const [price, setPrice] = useState(parseFloat(0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
    const [priceoff, setPriceoff] = useState(parseFloat(0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
    const [desc, setDesc] = useState('')
    const [images, setImages] = useState([])
    const [uploadedImages, setUploadesImages] = useState([])
    const [variationsProd, setVariationsProd] = useState([])
    const [combinations, setCombinations] = useState([])
    const [modalVariations, setModalVariations] = useState(false)
    const [category, setCategory] = useState([])

    useEffect( () => {
        if (edit){
            getVariations()
            getProductById(idProduto)
            .then( (data) => {
                const aux = categorias.filter((element) => data.product.categoria.some((other) => other.value === element._id))
                setName(data.product.title) 
                setPrice(parseFloat(data?.product?.preco?.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
                setPriceoff(parseFloat(data?.product?.desconto?.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
                setDesc(data.product.desc) 
                setCategory(aux.map( element => ({value:element._id, label:element.name}) ))
                setUploadesImages(data.product.img)
                setVariationsProd(data.product.variations)
                setCombinations(numberToCurrency(data.product.combinations))
            } )
            .catch(err => console.log(err))
        }
    },[idProduto] )

    function inverseCurrency(value){
        let stringValue = value.replace(/,/, '.').replace(/./, '').replace(/[\D]/g, '')
        return stringValue/100
    }

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

    function currencyToNumber(){
        let aux = combinations.map(el => {
            return {
                ...el,
                price: inverseCurrency(el.price),
                priceoff: inverseCurrency(el.priceoff)
            }
        })
        return aux
    }

    function numberToCurrency(comb){
        let aux = comb.map(el => {
            return {
                ...el,
                price: parseFloat(el.price.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                priceoff: parseFloat(el.priceoff.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }
        })
        return aux
    }

    async function handleSubmit() {
        if(inverseCurrency(price) === 0){
            notifyError('Valor de preço inválido')
            return
        }
        if(inverseCurrency(price) <= inverseCurrency(priceoff)){
            notifyError('Valor de desconto inválido')
            return
        }
        if(edit){
            updateProduct(idProduto, name, inverseCurrency(price), inverseCurrency(priceoff), category, desc, images, uploadedImages, currencyToNumber(), variationsProd)
            .then( (data) => {
                if(!!data.product){
                    setUploadesImages(data?.product?.img)
                    setImages([])
                    setAnimate(false)
                    setTimeout(() => setModalProduto(false), 200) 
                    notifySucess('Produto atualizado com sucesso.')
                
                }else{
                    notifyError(data.error)
                }

            } )
        }
        else{
            addProduct(name, inverseCurrency(price), inverseCurrency(priceoff), category, desc, images, currencyToNumber(), variationsProd).then(data => {
                if(!!data.message){
                  setAnimate(false)
                  setTimeout(() => setModalProduto(false), 200) 
                  notifySucess(data.message)
                }
                else{
                  notifyError(data.error)
                }
            })
        }
    }

    const genNames = (comb) => {
        let combFormated = ''
        for (let i = 0; i < comb.length; i++){
            const vari = variations.find( el => el._id === variationsProd[i].idVariacao )
            const op = vari?.options.find( el => el.value === comb[i] )
            if(i === (comb.length-1)){
                combFormated = combFormated + `${op.label}`
            }
            else{
                combFormated = combFormated + `${op.label} - `
            }
        }
        return combFormated
    }

    function verifySelected( idVar, idOption ){
        const variationSel = variationsProd.find(el => el.idVariacao === idVar)
        
        if (!!variationSel){
            return variationSel.idOptions.includes( idOption)
        }
        else {
            return false
        }
    }

    function genCombinations(vars){
        const result = combine(vars.map( el => el.idOptions )) || []
        const combs = result.map( el => {
            return {
                id: uuidv4(),
                price: price,
                priceoff: priceoff,
                combination: el.split(' ')
            }
        } )
        setCombinations(combs)
    }

    function handleSelect(idVar, idOption){
        const variationSel = variationsProd.find(el => el.idVariacao === idVar)
        
        if (!!variationSel){    
            const variationsAux = variationsProd.map(el =>{
                if(el.idVariacao === idVar){
                    if(el.idOptions.includes(idOption)){
                        const attOptions = el.idOptions.filter( elem => elem !== idOption )
                        return {idVariacao: idVar, idOptions: attOptions}
                    }
                    else{
                        return {idVariacao: idVar, idOptions: [...el.idOptions, idOption]}
                    }
                    
                }
                return el
            })       
            setVariationsProd(variationsAux)
            genCombinations(variationsAux) 
        }
        else {
            const variationsAux = [ ...variationsProd, {idVariacao: idVar, idOptions: [idOption]} ]
            setVariationsProd( variationsAux )
            genCombinations(variationsAux)
        }
        
    }

  return (

    <>
    <div 
      className=' w-screen h-screen bg-gray-400/50 absolute left-0 top-0 flex justify-center items-center z-10' 
      onClick={() => {
        setModalVariations(false)
        setAnimate(false)
        setTimeout(() => setModalProduto(false), 200) 
      }}
    >
        
    </div>
    {
    modalVariations &&
    <div className='w-full lg:w-[650px] left-0 lg:left-[calc(50%-325px)] bottom-0 lg:top-[calc(50%-330px)] h-fit bg-white flex flex-col items-center z-40 absolute rounded-t-3xl lg:rounded-2xl'>

        <h2 className='text-center py-4 border-b w-full font-medium relative'>{`${combinations.length === 0 ? 'Adicionar variações': 'Editar variações'}`}
            <GrFormClose 
                className='absolute w-8 h-8 text-black left-2 top-3 cursor-pointer'
                onClick={() => setModalVariations(false)}
            />
        </h2>

        <div className='flex flex-col py-2 px-4 w-full overflow-auto h-[470px]'>
            <p className='text-[13px] text-gray-500 text-center my-3'>Adicione ao seu produto variantes como "cores", "tamanhos", e outros.</p>
            <div className='flex flex-col gap-3 mt-2'>
            {             
                variations.length > 0 &&   
                variations.map( (variation, index) => (
                    <div key={variation._id} className='flex flex-col w-full border rounded-lg px-[16px] py-5'>
                        <h3 className='text-[14px] font-medium mb-2'>{variation.name}</h3>
                        <p className='text-[13px] mb-1'>Selecione as opções</p>
                        <div className='flex flex-wrap gap-2'>
                            {variation.options.map( option => (
                            <button 
                                key={option.value}
                                className={`${verifySelected(variation._id, option.value) === true ? 'bg-black text-white': 'bg-white border'} py-2 px-3 rounded-lg text-[14px]`}
                                onClick={() => handleSelect(variation._id, option.value)}
                            >
                                {option.label}                                
                            </button>
                            ) )}
                        </div>
                    </div>
                ) )
               
            }
            </div>
        </div>
    </div>
    }
    
    <div 
        className={`${animate ? 'slide-in-bottom':'slide-out-bottom'} w-full lg:w-[650px] left-0 lg:left-[calc(50%-325px)] bottom-0 lg:top-[calc(50%-330px)] h-fit bg-white flex flex-col items-center z-30 absolute rounded-t-3xl lg:rounded-2xl`}
    >
        <h2 className='text-center py-4 border-b w-full font-medium'>{`${edit?'Editar':'Adicionar'} Produto`}</h2>
        <div className='flex flex-col py-2 px-7 w-full overflow-auto h-[470px]'>
            <div className='flex gap-x-6'>
                <div className='flex flex-col  w-8/12 mb-6'>
                    <p className='mb-2 mt-2 text-sm font-medium'>Nome</p>
                    <input 
                        className='px-4 py-2.5 w-full focus:outline outline-1 outline-blue-500 rounded-lg bg-gray-100' 
                        type="text" 
                        placeholder='Ex: Camisa preta' 
                        value={name}
                        onChange = {(event) => setName(event.target.value)}    
                    />    
                </div>
                <div className='flex flex-col'>
                    <p className='mb-2 mt-2 text-sm font-medium'>Preço</p>
                    <input 
                        className='px-4 py-2.5 w-full rounded-lg bg-gray-100 focus:outline outline-1 outline-blue-500' 
                        type='text'
                        value={price}
                        onChange={event => setPrice(masks.maskCurrency(event.target.value)) }    
                    />    
                </div>
            </div>
            <div className='flex flex-col w-full mb-6'>
                <p className='mb-2 text-sm font-medium'>Descrição</p>
                <textarea 
                    className='px-4 py-2.5 w-full rounded-lg bg-gray-100 focus:outline outline-1 outline-blue-500' 
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
                        return {value: element._id, label: element.name}               
                        })}
                        
                    onChange = {setCategory}
                    value={category}
                    /> 
            </div>
            {
                verMais && 
                <>
                <div className='flex flex-col w-1/3 mb-3'>
                    <p className='mb-2 mt-2 text-sm font-medium'>Desconto</p>
                    <input 
                        className='px-4 py-2.5 w-full rounded-lg bg-gray-100 focus:outline outline-1 outline-blue-500' 
                        type='text' 
                        value={priceoff}
                        onChange={event => setPriceoff(masks.maskCurrency(event.target.value)) }    
                    />    
                </div>
                <div className='flex flex-col'>
                    <p className='mb-3 mt-2 text-sm font-medium'>Variações</p>
                    <button 
                        className='text-sm text-blue-500 font-medium w-full text-left'
                        onClick={() => setModalVariations(true)}
                        >
                            {`${combinations.length === 0 ? 'Adicionar variações': 'Editar variações'}`}
                    </button>
                    {
                        combinations.length > 0 &&
                        <div className='flex flex-col my-2'>
                            <div className='flex w-full px-6 py-3 bg-gray-50 text-[14px] font-medium rounded-md'>
                                <p className='w-1/2'>Variações</p>
                                <p className='w-1/4'>Preço</p>
                                <p className='w-1/4'>Desconto (%)</p>
                            </div>
                        {
                            combinations.map(el => (
                                <div key={el?.id} className='grid grid-cols-4 w-full text-[14px] px-6 py-2 border-b items-center'>
                                    <p className='col-span-2'>{genNames(el?.combination)}</p>
                                    <div className='flex bg-gray-200 items-center col-span-1 w-[80%] rounded-lg'>
                                        <input 
                                            type='text' 
                                            className='py-2 px-2 bg-gray-100 text-[13px] w-full rounded-r-lg outline-0'
                                            value={el === undefined ? 
                                                0 :
                                                el.price}
                                            onChange={(e) => {
                                                setCombinations( prev => prev.map( elem => {
                                                    if(elem.id === el.id){
                                                        return { ... el, price: masks.maskCurrency(e.target.value) }
                                                    }
                                                    return elem
                                                } ) )
                                            }}
                                        />
                                    </div>
                                    <div className='flex bg-gray-200 items-center col-span-1 w-[80%] rounded-lg'>
                                        <input 
                                            type='text' 
                                            className='py-2 px-2 bg-gray-100 text-[13px] w-full rounded-r-lg outline-0'
                                            value={el === undefined ? 
                                                0 : 
                                                el?.priceoff}
                                            onChange={(e) => {
                                                setCombinations( prev => prev.map( elem => {
                                                    if(elem.id === el.id){
                                                        return { ... el, priceoff: masks.maskCurrency(e.target.value) }
                                                    }
                                                    return elem
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>)
                            )
                        }
                        </div>
                    }
                    
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
                            style={{ 
                                backgroundImage: `url(${import.meta.env.VITE_AWS_URL}${image})`, 
                                boxSizing: 'border-box', backgroundSize: 'cover'}}
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
            <div className='flex justify-between items-center w-full mb-6 lg:mb-0'>

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