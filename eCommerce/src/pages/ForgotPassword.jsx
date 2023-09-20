import React, { useState } from 'react'
import {RiLockPasswordFill} from "react-icons/ri"
import InputPayment from '../components/InputPayment'

export default function ForgotPassword() {

    const [email, setEmail] = useState('')

    return (
    <section className='flex flex-col justify-center items-center w-screen h-screen bg-[#f1f1f1] text-black/80'>
        <div className='flex flex-col justify-center items-center w-1/3 gap-5 bg-white px-16 pt-10 pb-16 rounded-md shadow-md shadow-gray-400/60'>
            <RiLockPasswordFill className='w-36 h-36 text-color-primary'/>
            <h1 className='font-bold text-3xl'>Esqueceu sua senha?</h1>
            <p className='text-sm'>Informe seu e-mail para receber o link para criar uma nova senha.</p>
            <InputPayment 
                title='E-mail' 
                placeholder='Digite seu e-mail' 
                field={email} 
                setField={(ev) => setEmail(ev.target.value)} 
                id='email' 
                blur={() => {}} 
                width='w-full'
            />
            <button className='bg-color-primary text-white w-full rounded-lg py-3 font-medium'>Enviar Link</button>
        </div>
    </section>
  )
}
