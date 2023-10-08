import React, { useState } from 'react'
import {BsFiletypeCsv} from 'react-icons/bs'
import papa from 'papaparse'
import notifies from '../utils/toastNotifies'
import LoadingButton from './LoadingButton'
import { useProductContext } from '../contexts/Product'

export default function FileUpload() {

    const {addProductByFile} = useProductContext()

    const [products, set_products] = useState([])
    const [loading, set_loading] = useState(false)

    function handle_submit(){
        if(products.length > 0){
            set_loading(true)
            addProductByFile(products)
            .then(data => {
                set_loading(false)
                set_products([])
                if(!!data.message){
                    notifySucess(data.message)
                }
                else notifyError(data.error)
            })
        }
        else notifyError("Não há produtos para cadastrar")
    }

    async function handleFiles(ev){
        const csvFile = ev.target.files[0]
        if(csvFile && csvFile.type === "text/csv"){
            papa.parse(csvFile, {
                header: true,
                complete: (results) => {
                    const data = results?.data.slice(0, -1)
                    set_products(data.map( el => ({
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
    <div className='flex items-center flex-col w-full text-black/90 h-full'>
        <notifies.Container />
        <div className='flex flex-col w-full lg:[90%] bg-white py-10 px-4 lg:px-7 rounded-xl border border-gray-300/80 lg:border-gray-200/70 gap-7 h-full'>
            <div className='flex justify-between'>
                <h1 className='font-medium text-xl'>Upload de arquivos</h1>
                {
                    products.length > 0 &&
                    <LoadingButton
                        loading={loading}
                        text={'Enviar'}
                        handleSubmit={handle_submit}
                        full={false}
                        bg_color='bg-blue-500'
                    />
                }
            </div>
            {
                products.length === 0 ?
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
                </div> : 
                <div className='flex flex-col gap-y-1 overflow-y-auto h-full'>
                    <div className='grid grid-cols-10 text-gray-500/80 py-3 border-b mb-1'>
                        <h2 className='col-span-2 font-medium'>NOME</h2>
                        <h2 className='col-span-7 font-medium'>DESCRIÇÃO</h2>
                        <h2 className='col-span-1 font-medium pl-5'>PREÇO</h2>
                    </div>
                    <div className='flex flex-col'>
                        {
                            products.map((el, index) => (
                                <div 
                                    key={index}
                                    className='grid grid-cols-10 py-4 border-b'    
                                >
                                    <h2 className='col-span-2 font-medium'>{el.title}</h2>
                                    <h2 className='col-span-7'>{el.desc}</h2>
                                    <h2 className='col-span-1 pl-5 font-medium'>{el.price}</h2>
                                    <div className='flex flex-col col-span-10 gap-1.5'>
                                        <h3 className=' text-gray-500 font-medium mt-1.5'>Imagens</h3>
                                        <div className='flex gap-2 flex-wrap'>
                                            {
                                                el.urls.map((url, index) => (
                                                    <p 
                                                        key={index}
                                                        className='text-xs text-white rounded-md font-medium px-2 py-1.5 bg-blue-600'
                                                    >{url}</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    </div>
  )
}
