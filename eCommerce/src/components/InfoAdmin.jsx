import React, { useEffect, useState } from 'react'
import {IoShareSocialOutline} from 'react-icons/io5'
import { useCatalogContext } from '../contexts/Catalog';
import ModalRsociais from './ModalRsociais';
import masks from '../utils/masks.js';
import notifies from '../utils/toastNotifies';
import LoadingButton from './LoadingButton';
import InputAdmin from './InputAdmin';
import Editor from './Editor';

export default function InfoAdmin() {

  const [modalRS, setModalRS] = useState(false);
  const {getCatalog, catalog, setCatalog, updateCatalog} = useCatalogContext()
  const [loading, setLoading] = useState(false)

  useEffect( ()=> {
    getCatalog()
  }, [] )

  function handleSubmit(){
    setLoading(true)
    updateCatalog().then(data => {
      setLoading(false)
      if(!!data.message){
        notifies.sucess(data.message)
      }
      else{
        notifies.error(data.error)
      }
    })
  }

  return (
    <section className='flex flex-col items-center pb-5 xl:mx-44'>
      <notifies.Container />
      {
        modalRS && <ModalRsociais setModalRS={setModalRS} catalog={catalog} setCatalog={setCatalog} sucesso={notifies.sucess} erro={notifies.error}/>
      }
      <h2 className='mb-5 font-medium w-full text-xl'>Informações</h2>
      <div className='flex flex-col w-full gap-y-6 bg-white px-7 py-5 rounded-xl'>
        <InputAdmin 
          title={'Nome da loja'} 
          value={catalog.nome} 
          setValue={ev=>setCatalog(prev=>({...prev, nome: ev.target.value}))} 
          placeholder='Digite o nome da sua loja'/>

        <div className='flex flex-col w-full'>
          <p className='mb-2 text-sm font-medium h-10'>Descrição</p>
          <Editor 
            val={catalog.sobre} 
            setVal={ev=>setCatalog(prev=>({...prev, sobre: ev}))}
          />
        </div>
        <InputAdmin 
            title={'Telefone'} 
            value={catalog.telefone} 
            setValue={ev=>setCatalog(prev=>({...prev, telefone: masks.maskWhats(ev.target.value)}))}
            placeholder='Telefone para contato com a loja'/>
        <InputAdmin 
            title={'WhatsApp'} 
            value={catalog.whats} 
            setValue={ev=>setCatalog(prev=>({...prev, whats: masks.maskWhats(ev.target.value)}))}
            placeholder='Número para clientes fazerem pedidos'/>
        <InputAdmin 
          title={'E-mail'} 
          value={catalog.email} 
          setValue={ev=>setCatalog(prev=>({...prev, email: ev.target.value}))}
          placeholder='E-mail para contato'/>
        
        <div className='flex flex-col w-full gap-y-3 bg-white p-5'>
          <h2 className='flex gap-2 font-medium  items-center'>
            <IoShareSocialOutline className='w-5 h-5'/>
            Redes sociais
          </h2>
          <button 
            className='text-blue-500 w-fit text-sm font-medium'
            onClick={() => setModalRS(true)}
          >+ Adicionar redes sociais</button>
        </div>
        <div className='flex justify-center'>
        <LoadingButton loading={loading} text={'Salvar alterações'} handleSubmit={handleSubmit} full={false} bg_color='bg-blue-500'/>
        </div>
      </div>
    </section>
  )
}