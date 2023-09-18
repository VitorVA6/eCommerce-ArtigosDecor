import React, { useState } from 'react'
import {MdEmail} from "react-icons/md"
import {RiLockPasswordFill} from "react-icons/ri"

export default function RecoveryPw() {

    const [code, setCode] = useState('')
    const [verified, setVerified] = useState(false)

  return (
    <section className='flex flex-col justify-center items-center w-screen h-screen bg-color-primary'>
        <div className='flex flex-col justify-center items-center w-1/2 gap-5 bg-white px-40 pt-10 pb-16 rounded-3xl'>
            {
                verified ? 
                <>
                    <RiLockPasswordFill className='w-36 h-36 text-color-primary'/>
                    <h1 className='font-bold text-3xl'>Crie a nova senha</h1>
                    <p className='text-center font-medium'>Defina uma nova senha diferente das anteriores e contendo no mínimo 8 caractéres.</p>
                </>
                :
                <>
                    <MdEmail className='w-36 h-36 text-color-primary'/>
                    <h1 className='font-bold text-3xl'>Mudança de senha</h1>
                    <p className='text-center font-medium'>Para continuar com a alteração da sua senha, preencha o campo abaixo com o código enviado para seu e-mail.</p>
                    <input 
                    className='px-5 py-2 mb-1 w-28 border outline-0 rounded-lg border-gray-300 font-medium text-lg tracking-widest'
                    maxLength={6}
                    type='number'
                    onChange={ (ev) => setCode(ev.target.value) }
                    />
                    <button className='bg-color-primary text-white w-full rounded-lg py-3 text-sm font-medium'>Enviar</button>
                </>
            }
        </div>
        
    </section>
  )
}
