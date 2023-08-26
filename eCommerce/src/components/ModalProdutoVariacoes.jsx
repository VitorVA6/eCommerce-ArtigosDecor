import React from 'react'
import { GrFormClose } from "react-icons/gr";


export default function ModalProdutoVariacoes({combinations, setModalVariations, variations, verifySelected, handleSelect}) {
  return (
    <div className='w-full lg:w-[650px] left-0 lg:left-[calc(50%-325px)] bottom-0 lg:top-[calc(50%-330px)] h-fit bg-white flex flex-col items-center z-50 absolute rounded-t-3xl lg:rounded-2xl'>
        <h2 className='text-center py-4 border-b w-full font-medium relative'>{`${combinations.length === 0 ? 'Adicionar variações': 'Editar variações'}`}
            <GrFormClose 
                className='absolute w-8 h-8 text-black left-2 top-3 cursor-pointer'
                onClick={() => setModalVariations(false)}
            />
        </h2>

        <div className='flex flex-col py-2 px-4 w-full overflow-auto h-[430px]'>
            <p className='text-[13px] text-gray-500 text-center my-3'>Adicione ao seu produto variantes como "cores", "tamanhos", e outros.</p>
            <div className='flex flex-col gap-3 mt-2'>
            {             
                variations.length > 0 &&   
                variations.map( variation => (
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
  )
}
