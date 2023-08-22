import React from 'react'
import loadImg from '../images/load-icon.png'

export default function LoadingButton({loading, text, handleSubmit, full}) {
  return (
    <button
        className={`bg-blue-500 text-white ${full===true?'w-full':'w-1/2'} rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-3 ${loading===true&&'opacity-60'}`}
        onClick = {() => {
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
