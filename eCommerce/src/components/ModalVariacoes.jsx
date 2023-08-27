import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useVariationContext } from '../contexts/Variation';
import LoadingButton from './LoadingButton';
import BaseModal from './BaseModal';
import InputAdmin from './InputAdmin';

export default function ModalVariacoes({setModalVariacoes, placeh1, placeh2, edit, idCustom, notifySucess, notifyError }) {

    const [options, setOptions] = useState([])
    const [nome, setNome] = useState('')
    const {getVariationById, addVariation, variations, updateVariation, removeVariation, removeOption} = useVariationContext()
    const [animate, setAnimate] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        if(edit){
            getVariationById(idCustom)
            .then( data => {
                setNome(data.name)
                setOptions(data.options)
            })
            .catch(err => console.log(err))
          }
    }, [] )

    function closeModal(){
        setAnimate(false)
        setTimeout(() => setModalVariacoes(false), 200) 
    }

    function add(){
        let optionsAux = options
        if (options.length > 0 ){
            let vazios = options.filter( elemento => elemento.label.trim() === '' )            
                
            let idVazios = vazios.map( el => el.value )
            optionsAux = optionsAux.filter( ele => 
                {
                    if (!idVazios.find( value => value === ele.value)){
                        return ele
                    }}
            )
            setOptions(optionsAux)           
        }
        let checkRepeat = variations.filter( (element) => element._id !== idCustom)
        checkRepeat = checkRepeat.find(element => element.name === nome)

        if(edit){
            if(nome.trim().length > 0 && !checkRepeat){
                setLoading(true)
                updateVariation( idCustom, nome, options )
                .then(data => {
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
        checkRepeat = variations.find(element => element.name === nome)

        if(nome.trim().length > 0 && !checkRepeat){
            setLoading(true)
            addVariation(nome, options).then(data => {
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
            notifyError('Variação inválida')
        }
    }

    function handleChange(index, e){
        let newOptions = [...options]
        newOptions[index]['label'] = e.target.value
        setOptions(newOptions)
    }

    function addOption(){
        if (options.length > 0 ){
            let vazios = options.filter( elemento => elemento.label.trim() === '' )
            if (vazios.length === 1) return
            else if(vazios.length > 1){
                vazios.shift()
                let idVazios = vazios.map( el => el.value )
                setOptions( options.filter( ele => 
                    {
                        if (!idVazios.find( value => value === ele.value)){
                            return ele
                        }}
                ))
                return
            }
        }
        setOptions([{label: '', value: uuidv4()}, ...options ])
    }

    function removeOpt(index){
        removeOption( idCustom, index )
        .then(data => {
            if(!!data.message){
                setOptions( options.filter( (element) => element.value !== index ) )
            }
            else{
                notifyError(data.error)
            }
        })
    }

    function remove(){
        removeVariation(idCustom)
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

  return (
    <BaseModal animate={animate} closeModal={closeModal} width={'2/5'} top={'lg:top-16 xl:top-28'}>
        <h2 className='text-center py-4 border-b w-full font-medium relative'>{`${edit ? 'Editar' : 'Adicionar'} variações`}
        <button 
            className={`${!edit && 'hidden'} text-red-500 font-normal absolute p-1 top-3 right-5`}
            onClick={() => remove()}
        >Excluir</button>
        </h2>
        <div className='flex flex-col py-2 px-4 w-full'>
            <InputAdmin width={'w-full'} title='Nome da variação' value={nome} setValue={v=>setNome(v)} placeholder={placeh1} type='text'/>
            <p className='mb-1 mt-2 text-sm font-medium'>Opções</p>
            <p className='text-xs text-gray-400 mb-2'>{placeh2}</p>
            <button 
                className='text-blue-500 bg-transparent text-left text-sm font-medium mb-4' 
                onClick={() => addOption()}    
            >+ Adicionar nova opção</button>
            <div className='flex flex-col h-40 lg:h-36 gap-y-2 overflow-auto'>
                {
                options.map( (element, index) => (
                <div key={element.value} className='flex items-center gap-1'>
                    <input 
                        className='px-4 py-2 w-full outline-0 rounded-lg bg-gray-100 focus:border border-blue-500' 
                        type="text"
                        value={element.label}
                        onChange = {(e) => handleChange(index, e) }
                    />
                    <button 
                        className='p-1'
                        onClick={() => removeOpt(element.value)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                ) )
                }
            </div>
        </div>
        <div className='p-4 border-t w-full flex justify-end'>
            <LoadingButton loading={loading} handleSubmit={add} text={'Salvar'} full={false}/>
        </div>
    </BaseModal>
  )
}
