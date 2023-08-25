import React, { useEffect, useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import {BsFillInfoCircleFill, BsGridFill} from 'react-icons/bs'
import {FaPaintBrush} from 'react-icons/fa'
import {MdAccountCircle} from 'react-icons/md'
import verifyScreen from '../utils/verifyScreen'

export default function NavLateralAdmin({selected, setSelected, setMenuMobile, menuMobile}) {
    const [opacity, setOpacity] = useState(0)
    const [animate, setAnimate] = useState(true)

    useEffect(()=>{
        if(menuMobile){
            setOpacity(100)
        }
    }, [menuMobile])

    function handleClassPage(option){
        if (option === selected){
            return 'text-gray-600'
        }
        else{
            return 'text-gray-400/80'
        }
    }

    function handleClass(){
        if(verifyScreen(767)){
            if(animate){
                return 'slide-in-right'
            }else{
                return 'slide-out-right'
            }
        }
        else{
            return ''
        }
    }

    function closeMenu(){
        setOpacity(0)
        setAnimate(false)
        setTimeout(() => {
            setMenuMobile(false)
            setAnimate(true)
        }, 300) 
    }

  return (
    <>
        <div 
            className={`${menuMobile ? 'flex' : 'hidden'} transition-opacity ease-in duration-400 opacity-${opacity} w-screen h-screen bg-black/50 absolute left-0 top-0 flex justify-center items-center z-10 overflow-hidden lg:hidden`} 
            onClick={() => closeMenu()}
            ></div>
        <section className={`${menuMobile ? 'flex flex-col' : 'hidden'} ${handleClass()} absolute -top-0 right-0 md:static md:animate-none md:flex flex-col border-x  md:py-8 md:pl-10 w-72 gap-y-6 h-full bg-white z-10`}>
            <div className='flex items-center justify-between md:hidden h-16 pl-5 pr-3 border-b border-gray-200'>
                <h3 className='text-lg font-medium'><nobr>Artigos Decor</nobr></h3>
                <IoMdClose 
                    className='w-7 h-7 cursor-pointer text-gray-500'
                    onClick={() => {
                        closeMenu()
                    }}    
                />
            </div>
            <button 
                className={`cursor-pointer  flex gap-3 items-center ${handleClassPage('catalog')} pl-5 md:pl-0`}
                onClick = {() => {
                    setSelected('catalog')
                    closeMenu()
                }}
            >
                <BsGridFill className='w-[19px] h-[19px]'/>
                Catálogo
            </button>
            <button 
                className={`cursor-pointer  flex gap-3 items-center ${handleClassPage('info')} pl-5 md:pl-0`}
                onClick = {() => {
                    setSelected('info')
                    closeMenu()}}
            >
                <BsFillInfoCircleFill className='w-[19px] h-[19px]'/>
                Informações
            </button>
            <button 
                className={`cursor-pointer  flex gap-3 items-center ${handleClassPage('custom')} pl-5 md:pl-0`}
                onClick = {() => {
                    closeMenu()
                    setSelected('custom')}}
            >
                <FaPaintBrush className='w-4.5 h-4.5'/>
                Personalizar
            </button>
            <button 
                className={`cursor-pointer  flex gap-3 items-center ${handleClassPage('acc')} pl-5 md:pl-0`}
                onClick = {() => {
                    closeMenu()
                    setSelected('acc')
                }}
            >
                <MdAccountCircle className='w-[22px] h-[22px] -ml-1'/>
                Conta
            </button>
        </section>
    </>
  )
}
