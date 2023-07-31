import React, { useState } from 'react'
import {AiOutlineInstagram} from 'react-icons/ai'
import {AiFillFacebook} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillTwitterSquare} from 'react-icons/ai'
import { useCatalogContext } from '../contexts/Catalog'

export default function ModalRsociais({setModalRS, catalog, setCatalog, sucesso, erro}) {

    const {updateCatalog} = useCatalogContext()
    const [animate, setAnimate] = useState(true)

    function handleSubmit(ev){
        ev.preventDefault()
        updateCatalog().then( data => {
            if(!!data.message){
                console.log(data.message)
                setAnimate(false)
                setTimeout(() => setModalRS(false), 200) 
                sucesso(data.message)
            }else{
                erro(data.error)
            }
        } )
    }

  return (
    <>
    <div 
      className=' w-screen h-screen bg-gray-400/50 absolute left-0 top-0 flex justify-center items-center z-10' 
      onClick={() => {
        setAnimate(false)
        setTimeout(() => setModalRS(false), 200) 
    }}
    >
        
    </div>
    <div 
        className={`${animate ? 'slide-in-bottom':'slide-out-bottom'} slide-in-bottom w-full lg:w-[450px] left-0 lg:left-[calc(50%-225px)] bottom-0 lg:top-[calc(50%-200px)] h-fit bg-white flex flex-col items-center z-20 absolute rounded-t-3xl lg:rounded-2xl`}
    >
        <h2 className='text-center py-4 border-b w-full font-medium'>Adicionar redes sociais</h2>
        <form 
            className='flex flex-col py-7 px-7 w-full gap-y-5 items-center'
            onSubmit={(ev) => handleSubmit(ev)}    
        >
            <div className='flex w-full gap-x-3 items-center'>
                <AiOutlineInstagram  className='w-9 h-9 text-gray-400'/>
                <input 
                    className='px-4 py-2 w-full border outline-0 rounded-lg border-gray-300' 
                    type="text" 
                    placeholder='instagram.com/username'
                    value={catalog.rsociais.insta}
                    onChange={(ev) => {
                        setCatalog( prev => {
                            return {...prev, rsociais: {...prev.rsociais, insta: ev.target.value}}
                        } )
                    }}
                />
            </div>
            <div className='flex w-full gap-x-3 gap-y-3 items-center'>
                <AiFillFacebook  className='w-9 h-9 text-gray-400'/>
                <input 
                    className='px-4 py-2 w-full border outline-0 rounded-lg border-gray-300' 
                    type="text" 
                    placeholder='facebook.com/username'
                    value={catalog.rsociais.face}
                    onChange={(ev) => {
                        setCatalog( prev => {
                            return {...prev, rsociais: {...prev.rsociais, face: ev.target.value}}
                        } )
                    }}
                />
            </div>
            <div className='flex w-full gap-x-3 gap-y-3 items-center'>
                <AiFillYoutube  className='w-9 h-9 text-gray-400'/>
                <input 
                    className='px-4 py-2 w-full border outline-0 rounded-lg border-gray-300' 
                    type="text" 
                    placeholder='youtube.com/channel'
                    value={catalog.rsociais.yt}
                    onChange={(ev) => {
                        setCatalog( prev => {
                            return {...prev, rsociais: {...prev.rsociais, yt: ev.target.value}}
                        } )
                    }}
                />
            </div>
            <div className='flex w-full gap-x-3 gap-y-3 items-center'>
                <AiFillTwitterSquare  className='w-9 h-9 text-gray-400'/>
                <input 
                    className='px-4 py-2 w-full border outline-0 rounded-lg border-gray-300' 
                    type="text" 
                    placeholder='twitter.com/username'
                    value={catalog.rsociais.tt}
                    onChange={(ev) => {
                        setCatalog( prev => {
                            return {...prev, rsociais: {...prev.rsociais, tt: ev.target.value}}
                        } )
                    }}
                />
            </div>
            <button 
                className='rounded-lg bg-blue-500 text-white py-2 w-fit px-10 mb-3'
            >
                Salvar alterações
            </button>
        </form>
        
    </div>
</>
  )
}
