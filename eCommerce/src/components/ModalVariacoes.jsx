import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useVariationContext } from '../contexts/Variation';

export default function ModalVariacoes({setModalVariacoes, placeh1, placeh2, edit, idCustom, notifySucess, notifyError }) {

    const [options, setOptions] = useState([])
    const [nome, setNome] = useState('')
    const {getVariationById, addVariation, variations, updateVariation, removeVariation, removeOption} = useVariationContext()
    const [animate, setAnimate] = useState(true)

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

                updateVariation( idCustom, nome, options )
                .then(data => {
                    if(!!data.message){
                      setAnimate(false)
                      setTimeout(() => setModalVariacoes(false), 200) 
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
            
            addVariation(nome, options).then(data => {
                if(!!data.message){
                  setAnimate(false)
                  setTimeout(() => setModalVariacoes(false), 200) 
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
                console.log('aehooo')
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
              setAnimate(false)
              setTimeout(() => setModalVariacoes(false), 200) 
              notifySucess(data.message)
            }
            else{
              notifyError(data.error)
            }
        })
    }

  return (
    <>
    <div 
      className=' w-screen h-screen bg-gray-400/50 absolute left-0 top-0 flex justify-center items-center z-10' 
      onClick={() => {
        setAnimate(false)
        setTimeout(() => setModalVariacoes(false), 200) 
      }}
    >
        
    </div>
    <div 
        className={`${animate ? 'slide-in-bottom':'slide-out-bottom'} w-full lg:w-[530px] left-0 lg:left-[calc(50%-265px)] bottom-0 lg:top-[calc(50%-260px)] h-fit bg-white flex flex-col items-center z-20 absolute rounded-t-3xl lg:rounded-2xl`}  
    >
        
        <h2 className='text-center py-4 border-b w-full font-medium relative'>{`${edit ? 'Editar' : 'Adicionar'} variações`}
        <button 
            className='text-red-500 font-normal absolute p-1 top-3 right-5'
            onClick={() => remove()}
        >Excluir</button>
        </h2>
        <div className='flex flex-col py-2 px-4 w-full'>
            <p className='mb-1 mt-2 text-sm font-medium'>Nome da variação</p>
            <p className='text-xs text-gray-400 mb-2'>{placeh1}</p>
            <input 
                className='px-4 py-2 mb-2 w-full outline-0 rounded-lg bg-gray-100' 
                type="text"
                value={nome}
                onChange={ (ev) => setNome(ev.target.value) }
            />
            <p className='mb-1 mt-2 text-sm font-medium'>Opções</p>
            <p className='text-xs text-gray-400 mb-2'>{placeh2}</p>
            <button 
                className='text-blue-500 bg-transparent text-left text-sm font-medium mb-4' 
                onClick={() => addOption()}    
            >+ Adicionar nova opção</button>
            <div className='flex flex-col h-40 lg:h-60 gap-y-2 overflow-auto'>
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
        <div className='p-4 border-t w-full'>
            <button 
                className='bg-blue-500 py-3 w-full text-white text-medium rounded-lg mb-6 lg:mb-0'
                onClick={() => add()}
            >Salvar</button>
        </div>
    </div>
</>
  )
}
