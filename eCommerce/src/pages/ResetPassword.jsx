import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import InputPayment from '../components/InputPayment'
import {RiLockPasswordFill} from "react-icons/ri"


export default function ResetPassword() {

    const [password, set_password] = useState('')
    const [confirm_password, set_confirm_password] = useState('')
    const {token} = useParams()

  return (
    <section className='flex flex-col justify-center items-center w-screen h-screen bg-[#f1f1f1] text-black/80'>
        <div className='flex flex-col justify-center items-center w-1/3 gap-5 bg-white px-16 pt-10 pb-16 rounded-md shadow-md shadow-gray-400/60'>
            <RiLockPasswordFill className='w-36 h-36 text-color-primary'/>
            <h1 className='font-bold text-3xl'>Redefina a senha</h1>
            <p className='text-sm'>Informe sua nova senha com pelo menos 8 dígitos.</p>
            <InputPayment
                title='Senha' 
                placeholder='Digite a nova senha' 
                field={password} 
                setField={(ev) => set_password(ev.target.value)} 
                id='password' 
                blur={() => {}} 
                width='w-full'
            />
            <InputPayment 
                title='Confirmar senha'
                placeholder='Digite a senha novamente' 
                field={confirm_password} 
                setField={(ev) => set_confirm_password(ev.target.value)} 
                id='confirm-password' 
                blur={() => {}} 
                width='w-full'
            />
            <button className='bg-color-primary text-white w-full rounded-lg py-3 font-medium'>Mudar senha</button>
        </div>
    </section>
  )
}
