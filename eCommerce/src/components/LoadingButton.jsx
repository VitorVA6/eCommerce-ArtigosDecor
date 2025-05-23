import React from 'react'
import loadImg from '../images/load-icon.png'

export default function LoadingButton({loading, text, handleSubmit, full, bg_color = 'bg-color-primary'}) {
  return (
    <button
        className={`${bg_color} text-white ${full===true?'w-full':'w-1/4'} rounded-md py-3 text-sm font-medium flex items-center justify-center gap-3 ${loading===true&&'opacity-60'}`}
        onClick = {(ev) => {
            ev.preventDefault()
            if(handleSubmit === undefined){}
            else{
                handleSubmit()
            }
        }}
        disabled={loading}
    >
        {
        loading === true ?
        <>
        <img className='w-5 h-5 animate-spin' src={loadImg} alt="" />
        Processando
        </>:
        <>
        {text}
        </>
        }
    </button>
  )
}
