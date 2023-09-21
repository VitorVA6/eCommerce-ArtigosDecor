import React from 'react'
import {BsFiletypeHtml} from 'react-icons/bs'

export default function IntegrateFacebookAdmin() {

    async function handleFiles(ev){
        const html = ev.target.files[0]
        if(html && html.type === "text/html"){
            console.log('Arquivinho de cria')
        }else{
            console.log('Formato de arquivo inválido')
        }
    }

  return (
    <div className='flex items-center flex-col w-full'>
        <div className='flex flex-col w-full lg:w-3/4 bg-white py-10 px-4 lg:px-7 rounded-xl border border-gray-300/80 lg:border-gray-200/70 gap-7'>
            <h1 className='font-medium text-lg'>Integrar ao Facebook/Instagram</h1>
            <div className='flex flex-col'>
                <h2 className='font-medium '>Verificação do domínio</h2>
                <p>Faça upload do arquivo HTML de verificação de domínio do facebook</p>
                <label className='mt-4 cursor-pointer bg-blue-500 py-3 w-48 items-center flex justify-center rounded-md text-white gap-3 font-medium'>
                    <input 
                        className='hidden' 
                        type='file' 
                        multiple={false} 
                        onChange={handleFiles} 
                        accept=".html"
                    />
                    <BsFiletypeHtml className='w-5 h-5 text-white'/>
                    Upload
                </label>
            </div>
        </div>
    </div>
  )
}
