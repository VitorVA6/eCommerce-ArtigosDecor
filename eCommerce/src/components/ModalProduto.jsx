import React, { useState } from 'react'
import Select from 'react-select'

export default function ModalProduto({setModalProduto, edit, categorias}) {

    const [verMais, setVerMais] = useState(false);

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
                        placeholder='Ex: Camisa preta' />    
                </div>
                <div className='flex flex-col'>
                    <p className='mb-2 mt-2 text-sm font-medium'>Preço</p>
                    <input 
                        className='px-4 py-2.5 w-full outline-0 rounded-lg bg-gray-100 focus:border border-blue-400' 
                        type='number' />    
                </div>
            </div>
            <div className='flex flex-col w-full mb-6'>
                <p className='mb-2 text-sm font-medium'>Descrição</p>
                <textarea 
                    className='px-4 py-2.5 w-full outline-0 rounded-lg bg-gray-100 focus:border border-blue-400' 
                    type="text" 
                    placeholder='Ex: Camiseta preta de algodão. Tamanhos P, M e G.' />    
            </div>
            <div className='flex flex-col w-full'>
                <p className='mb-2 text-sm font-medium'>Descrição</p>
                <Select 
                        className='text-sm'                    
                        placeholder='Ex: Camisas, calças, meias'
                        isMulti 
                        options={categorias.map( element => {
                            return {value: element, label: element}                    
                            })} 
                        /> 
            </div>
            {
                verMais && 
                <>
                <div className='flex flex-col w-1/3 mb-3'>
                    <p className='mb-2 mt-2 text-sm font-medium'>Preço promocional</p>
                    <input 
                        className='px-4 py-2.5 w-full outline-0 rounded-lg bg-gray-100 focus:border border-blue-400' 
                        type='number' />    
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

        <div className='flex items-center justify-between bg-gray-100 w-full px-6 py-4 rounded-b-2xl border-t'>
            <button className='border border-dashed border-gray-400/70 w-fit h-fit p-2.5 rounded-md'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            </button>
            <button className='bg-blue-500 py-2.5 w-72 text-white text-medium rounded-lg'>Confirmar</button>
        </div>
    </div>
</>
  )
}
