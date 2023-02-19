import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function ModalVariacoes({setModalVariacoes, placeh1, placeh2, edit }) {

    const [options, setOptions] = useState([])

    function handleChange(index, e){
        let newOptions = [...options]
        newOptions[index]['valor'] = e.target.value
        setOptions(newOptions)
    }

    function addOption(){
        if (options.length > 0 ){
            let vazios = options.filter( elemento => elemento.valor.trim() === '' )
            if (vazios.length === 1) return
            else if(vazios.length > 1){
                vazios.shift()
                let idVazios = vazios.map( el => el.id )
                setOptions( options.filter( ele => 
                    {
                        if (!idVazios.find( id => id === ele.id)){
                            return ele
                        }}
                ))
                return
            }
        }
        setOptions([{valor: '', id: uuidv4()}, ...options ])
    }

    function removeOption(index){
        setOptions( options.filter( (element) => element.id !== index ) )
    }

  return (
    <>
    <div 
      className=' w-screen h-screen bg-gray-400/50 absolute left-0 top-0 flex justify-center items-center z-10' 
      onClick={() => setModalVariacoes(false)}
    >
        
    </div>
    <div 
        className='slide-in-bottom h-fit bg-white flex flex-col items-center z-20 absolute rounded-2xl'
        style={{width: '530px',left: 'calc(50% - 265px)', top: 'calc(50% - 280px)'}}    
    >
        
        <h2 className='text-center py-4 border-b w-full font-medium relative'>{`${edit ? 'Editar' : 'Adicionar'} variações`}
        <button className='text-red-500 font-normal absolute p-1 top-3 right-5'>Excluir</button>
        </h2>
        <div className='flex flex-col py-2 px-4 w-full'>
            <p className='mb-1 mt-2 text-sm font-medium'>Nome da variação</p>
            <p className='text-xs text-gray-400 mb-2'>{placeh1}</p>
            <input className='px-4 py-2 mb-2 w-full outline-0 rounded-lg bg-gray-100' type="text"/>
            <p className='mb-1 mt-2 text-sm font-medium'>Opções</p>
            <p className='text-xs text-gray-400 mb-2'>{placeh2}</p>
            <button 
                className='text-blue-500 bg-transparent text-left text-sm font-medium mb-4' 
                onClick={() => addOption()}    
            >+ Adicionar nova opção</button>
            <div className='flex flex-col h-60 gap-y-2 overflow-auto'>
                {
                options.map( (element, index) => (
                <div key={element.id} className='flex items-center gap-1'>
                    <input 
                        className='px-4 py-2 w-full outline-0 rounded-lg bg-gray-100 focus:border border-blue-500' 
                        type="text"
                        value={element.valor}
                        onChange = {(e) => handleChange(index, e) }
                    />
                    <button 
                        className='p-1'
                        onClick={() => removeOption(element.id)}
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
            <button className='bg-blue-500 py-3 w-full text-white text-medium rounded-lg'>Salvar</button>
        </div>
    </div>
</>
  )
}
