import React, { useState } from 'react'
import {GrFormClose} from 'react-icons/gr'
import verifyScreen from '../utils/verifyScreen'

export default function NavLateralAdmin({selected, setSelected, menuMobile, setMenuMobile, animate, setAnimate}) {

    function handleClassPage(option){
        if (option === selected){
            return 'text-black'
        }
        else{
            return 'text-gray-400'
        }
    }

    function closeMenu(){
        setTimeout( ()=>setMenuMobile(false), 200 )
        setAnimate(false)
    }

    function handleClass(){
        if(verifyScreen(1224)){
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

  return (
    <section className={`${menuMobile ? 'flex flex-col' : 'hidden'} ${handleClass()} absolute -top-20 right-0 lg:static lg:flex flex-col border my-20 lg:py-8 lg:pl-10 w-72 gap-y-6 h-full bg-white z-40`}>
        <div className='flex items-center justify-between lg:hidden py-4 pl-5 pr-3 border-b border-gray-200'>
            <h3 className='text-lg font-medium'><nobr>Artigos Decor</nobr></h3>
            <GrFormClose 
                className='w-10 h-10 cursor-pointer'
                onClick={() => {
                    closeMenu()
                }}    
            />
        </div>
        <button 
            className={`cursor-pointer  flex gap-3 items-center ${handleClassPage('catalog')} pl-5 lg:pl-0`}
            onClick = {() => {
                setSelected('catalog')
                closeMenu()
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            Catálogo
        </button>
        <button 
            className={`cursor-pointer  flex gap-3 items-center ${handleClassPage('info')} pl-5 lg:pl-0`}
            onClick = {() => {
                setSelected('info')
                closeMenu()}}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            Informações
        </button>
        <button 
            className={`cursor-pointer  flex gap-3 items-center ${handleClassPage('custom')} pl-5 lg:pl-0`}
            onClick = {() => {
                closeMenu()
                setSelected('custom')}}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            Personalizar
        </button>
        <button 
            className={`cursor-pointer  flex gap-3 items-center ${handleClassPage('acc')} pl-5 lg:pl-0`}
            onClick = {() => {
                closeMenu()
                setSelected('acc')
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Conta
        </button>
    </section>
  )
}
