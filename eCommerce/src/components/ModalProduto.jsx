import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useProductContext } from '../contexts/Product';
import { v4 as uuidv4 } from 'uuid';
import { BsCardImage } from "react-icons/bs";
import { useVariationContext } from '../contexts/Variation';
import combine from '../utils/combine';
import masks from '../utils/masks';
import LoadingButton from './LoadingButton';
import BaseModal from './BaseModal';
import ModalProdutoVariacoes from './ModalProdutoVariacoes';
import InputAdmin from './InputAdmin';
import UploadImagesBlock from './UploadImagesBlock';
import {inverseCurrency} from '../utils/currency'

export default function ModalProduto({setModalProduto, edit, categorias, idProduto, notifySucess, notifyError}) {
    const {addProduct, getProductById, updateProduct, numberToCurrency, currencyToNumber} = useProductContext()
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
    const [loading, setLoading] = useState(false)

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

    function closeModal(){
        setAnimate(false)
        setTimeout(() => setModalProduto(false), 200)
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

    function handleSubmit() {
        if(inverseCurrency(price) === 0){
            notifyError('Valor de preço inválido')
            return
        }
        if(inverseCurrency(price) <= inverseCurrency(priceoff)){
            notifyError('Valor de desconto inválido')
            return
        }
        if(edit){
            setLoading(true)
            updateProduct(idProduto, name, inverseCurrency(price), inverseCurrency(priceoff), category, desc, images, uploadedImages, currencyToNumber(combinations), variationsProd)
            .then( (data) => {
                setLoading(false)
                if(!!data.product){
                    setUploadesImages(data?.product?.img)
                    setImages([])
                    closeModal() 
                    notifySucess('Produto atualizado com sucesso.')
                }else{
                    notifyError(data.error)
                }
            } )
        }
        else{
            setLoading(true)
            addProduct(name, inverseCurrency(price), inverseCurrency(priceoff), category, desc, images, currencyToNumber(combinations), variationsProd).then(data => {
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
        return false
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
      <BaseModal animate={animate} closeModal={closeModal} width={'1/2'} top={'lg:top-14'}>
         {
            modalVariations &&
            <ModalProdutoVariacoes combinations={combinations} setModalVariations={setModalVariations} 
                variations={variations} verifySelected={verifySelected} handleSelect={handleSelect}/>
        }
        <h2 className='text-center py-4 border-b w-full font-medium'>{`${edit?'Editar':'Adicionar'} Produto`}</h2>
        <div className='flex flex-col py-2 px-7 w-full overflow-auto h-[400px]'>
            <div className='flex gap-x-6'>
                <InputAdmin width={'w-8/12'} title={'Nome'} value={name} 
                    setValue={v => setName(v.target.value)} placeholder='Ex: Camisa preta' type='text'/>
                <InputAdmin width={'w-4/12'} title={'Preço'} value={price} 
                    setValue={v=>setPrice(masks.maskCurrency(v.target.value))} placeholder='' type='text'/>
            </div>
            <div className='flex flex-col w-full mb-6'>
                <p className='mb-2 text-sm font-medium'>Categoria</p>
                <Select 
                    className='text-sm' placeholder='Ex: Camisas, calças, meias' value={category} onChange = {setCategory}
                    options={categorias.map( element => {
                        return {value: element._id, label: element.name}               
                    })}
                /> 
            </div>
            <div className='flex flex-col w-full'>
                <p className='mb-2 text-sm font-medium'>Descrição</p>
                <textarea 
                    className='px-4 py-2.5 w-full rounded-lg bg-gray-100 focus:outline outline-1 outline-blue-500' 
                    type="text" 
                    placeholder='Ex: Camiseta preta de algodão. Tamanhos P, M e G.' 
                    value={desc}
                    onChange={event => setDesc(event.target.value) }    
                    />    
            </div>
            {
            verMais && 
            <>
                <InputAdmin width={'w-1/3'} title='Desconto' value={priceoff} 
                    setValue={v=>setPriceoff(masks.maskCurrency(v.target.value))} placeholder='' type='text'/>
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
            <UploadImagesBlock 
                uploadedImages={uploadedImages} removeUploadedImages={removeUploadedImages} 
                images={images} removeFiles={removeFiles}
            />
            <div className='flex justify-between items-center w-full mb-6 lg:mb-0'>
                <label className='border border-dashed border-gray-400/70 w-fit h-fit p-2.5 rounded-md cursor-pointer'>
                    <input className='hidden' multiple={true} type='file' onChange={(ev) => handleFiles(ev)} />
                    <BsCardImage className="w-[22px] h-[22px] text-gray-400/70"/>
                </label>
                <LoadingButton loading={loading} handleSubmit={handleSubmit} text={'Confirmar'} full={false} />
            </div>
        </div>
    </BaseModal>
)
}