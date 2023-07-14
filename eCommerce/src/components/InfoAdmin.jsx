import React, { useEffect, useState } from 'react'
import {IoShareSocialOutline} from 'react-icons/io5'
import { useCatalogContext } from '../contexts/Catalog';
import ModalRsociais from './ModalRsociais';
import masks from '../utils/masks.js';

export default function InfoAdmin() {

  const [modalRS, setModalRS] = useState(false);

  const {getCatalog, catalog, setCatalog, updateCatalog, ToastContainer, notifyError, notifySucess} = useCatalogContext()

  useEffect( ()=> {

    getCatalog()

  }, [] )

  return (
    <section className='flex flex-col gap-1 items-center pb-5'>
      <ToastContainer />
      {
        modalRS && <ModalRsociais setModalRS={setModalRS} catalog={catalog} setCatalog={setCatalog}/>
      }
      <h2 className='mb-5 font-medium w-full text-xl'>Informações</h2>
      <div className='flex flex-col w-full gap-y-3 bg-white border border-gray-300/80 lg:border-gray-200/70 rounded-lg p-5'>
        <h2 className='flex gap-2 font-medium items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Sobre
        </h2>
        <textarea 
          className='border-b outline-none focus:border-black text-sm' 
          rows="3" 
          placeholder='Informações sobre o seu negócio'
          value={catalog.sobre}
          onChange={(ev)=> {
            setCatalog( (prev) => {
              return {...prev, sobre: ev.target.value}
            } )
          }}
        ></textarea>
      </div>

      <div className='flex flex-col w-full gap-y-3 bg-white border border-gray-300/80 lg:border-gray-200/70 rounded-lg p-5'>
        <h2 className='flex gap-2 font-medium  items-center'>
          <IoShareSocialOutline className='w-5 h-5'/>
          Redes sociais
        </h2>
        <button 
          className='text-blue-500 w-fit text-sm font-medium'
          onClick={() => setModalRS(true)}
        >+ Adicionar redes sociais</button>
      </div>

      <div className='flex flex-col w-full gap-y-3 bg-white border border-gray-300/80 lg:border-gray-200/70 rounded-lg p-5'>
        <h2 className='flex gap-2 font-medium items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          Telefone
        </h2>
        <input 
          className='border-b outline-none focus:border-black py-1 text-sm' 
          type="text" 
          placeholder='Telefone para contato' 
          value={catalog.telefone}
          onChange={(ev)=> {
            setCatalog( (prev) => {
              return {...prev, telefone: masks.maskWhats(ev.target.value)}
            } )
          }}
        />
      </div>

      <div className='flex flex-col w-full gap-y-3 bg-white border border-gray-300/80 lg:border-gray-200/70 rounded-lg p-5'>
        <h2 className='flex gap-2 font-medium items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
          E-mail
        </h2>
        <input 
          className='border-b outline-none focus:border-black py-1 text-sm' 
          type="text" 
          placeholder='E-mail para contato' 
          value={catalog.email}
          onChange={(ev)=> {
            setCatalog( (prev) => {
              return {...prev, email: ev.target.value}
            } )
          }}
        />
      </div>

      <button 
        className='rounded-lg bg-blue-500 text-white text-sm font-medium py-2.5 lg:py-3 lg:w-fit px-10 mt-8'
        onClick={() => {
          updateCatalog().then(data => {
            if(!!data.message){
              notifySucess(data.message)
            }
            else{
              notifyError(data.error)
            }
          })
        }}
      >
        Salvar alterações
      </button>
    
    </section>
  )
}
