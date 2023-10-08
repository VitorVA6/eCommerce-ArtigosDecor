import React from 'react'
import {BsFiletypeCsv} from 'react-icons/bs'
import papa from 'papaparse'
import notifies from '../utils/toastNotifies'

export default function FileUpload() {
    async function handleFiles(ev){
        const csvFile = ev.target.files[0]
        if(csvFile && csvFile.type === "text/csv"){
            papa.parse(csvFile, {
                header: true,
                complete: (results) => {
                    const data = results?.data.slice(0, -1)
                    console.log(data.map( el => ({
                        ...el,
                        urls: el.urls.split(',')
                    }) ))
                }
            })
        }else{
            notifies.error('Formato de arquivo inválido')
        }
    }

  return (
    <div className='flex items-center flex-col w-full'>
        <notifies.Container />
        <div className='flex flex-col w-full lg:w-3/4 bg-white py-10 px-4 lg:px-7 rounded-xl border border-gray-300/80 lg:border-gray-200/70 gap-7'>
            <h1 className='font-medium text-lg'>Upload de arquivos</h1>
            <div className='flex flex-col'>
                <h2 className='font-medium '>Cadastre produtos utilizando arquivos XML ou CSV</h2>
                <p>Faça upload do arquivo contendo as informações dos produtos a serem cadastrados</p>
                <label className='mt-4 cursor-pointer bg-blue-500 py-3 w-48 items-center flex justify-center rounded-md text-white gap-3 font-medium'>
                    <input 
                        className='hidden' 
                        type='file' 
                        multiple={false} 
                        onChange={handleFiles} 
                        accept=".csv"
                    />
                    <BsFiletypeCsv className='w-5 h-5 text-white'/>
                    Upload
                </label>
            </div>
        </div>
    </div>
  )
}
